const router = require("express").Router();
const {users} = require("../../prisma/client");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../../utils/jwtGenerator");

//Matches route /login
router.post("/", async (req, res) => {
  // const client = await pool.connect();

  try {
    //1. destructure req.body
    const { email, password } = req.body;

    //2. check if user doesn't exist (throw error if not)
    const user = await users.findFirst({where: {email}});
    if (user === null) {
      return res.status(401).send("Email or password is incorrect");
    }

    //3. check if incoming password is correct
    const validPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );
    if (!validPassword) {
      return res.status(401).send("Email or password is incorrect");
    }

    //4. give jwt token
    const token = jwtGenerator(user.id);

    res.json({
      token,
      auth: user.userAuthority,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({msg: "Server error"})
  }
});

module.exports = router;
