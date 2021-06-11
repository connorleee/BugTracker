const router = require("express").Router();
const pool = require("../../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../../utils/jwtGenerator");

//Matches route /login
router.post("/", async (req, res) => {
  const client = await pool.connect();

  try {
    //1. destructure req.body
    const { email, password } = req.body;

    //2. check if user doesn't exist (throw error if not)
    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).send("Email or password is incorrect");
    }

    //3. check if incoming password is correct
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );
    if (!validPassword) {
      return res.status(401).send("Email or password is incorrect");
    }

    //4. give jwt token
    const token = jwtGenerator(user.rows[0].id);

    res.json({
      token,
      auth: user.rows[0].user_authority,
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

module.exports = router;
