const {
  users,
  query
} = require("../prisma/client");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

module.exports = {
  getAll: async (req, res) => {


    try {
      const {
        rows
      } = await query(
        "SELECT id, first_name, last_name, phone, email, user_authority FROM users"
      );

      res.json(rows);
    } catch (err) {
      res.status(500).json({
        msg: "Unable to get users from database"
      });
    } finally {
      console.log("Error getting users from database: ", err);
      // await client.release();
    }
  },
  addUser: async (req, res) => {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      userAuth
    } = req.body;

    // const prisma = new PrismaClient()
    try {
      //Look if user already exists
      const user = await users.findFirst({
        where: {
          email
        }
      });
      //Query returns null user not found
      if (user !== null) {
        return res.status(401).send("User already exists");
      }

      //password encryption before adding to DB
      const salt = await bcrypt.genSaltSync(10);
      const passwordHash = await bcrypt.hashSync(password, salt);

      //Add new user to DB
      //BUG: camel casel columns getting converted to lowercase
      // pg pool always convert camel cased column names to lowercase and postgres is case sensitive

      // const newUser = await client.query(
      //   `INSERT INTO users (first_Name, lastName, phone, email, passwordHash, userAuthority) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      //   [firstName, lastName, phone, email, hash, userAuth]
      // );

      //TODO: ADD prisma client to perform the register user query

      const newUser = await users.create({
        data: {
          firstName,
          lastName,
          phone,
          email,
          passwordHash,
          ...{
            userAuthority: userAuth.toUpperCase()
          }
        }
      })

      //Generate Token
      const token = jwtGenerator(newUser.id);

      res.json({
        token
      });
    } catch (err) {
      console.log(
        `Failed to add ${firstName} ${lastName} to the database: `,
        "\n",
        err
      );
      return res.status(400).json({
        msg: "Please review user add query"
      });
    }
  },
  getUser: async (req, res) => {
    const {
      id
    } = req.params;


    try {
      const {
        rows
      } = await client.query(
        "SELECT id, first_name, last_name, phone, email, user_authority, password_hash FROM users WHERE id = $1",
        [id]
      );

      res.json(rows[0]);
    } catch (err) {
      console.log(`Failed to get user ${id}: `, "\n", err);
      res.status(400).json({
        msg: "Please review user request query"
      });
    } finally {
      await client.release();
    }
  },
  lookupUserByEmail: async (req, res) => {
    const {
      email
    } = req.body;
    console.log(`Looking for existing email: ${email}`);



    try {
      console.log("connected to postgres Pool");

      const {
        rows
      } = await query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      );

      console.log(`query result: ${rows}`);

      res.json(rows);
    } catch (err) {
      console.log(`Failed to get user: `, "\n", err);
      res.status(400).json({
        msg: "Please review user request query"
      });
    }
  },
  updateUser: async (req, res) => {
    const {
      id
    } = req.params;
    const {
      first_name,
      last_name,
      phone,
      email,
      user_authority
    } = req.body;


    try {
      const updateUser = await client.query(
        "UPDATE users SET (first_name, last_name, phone, email, user_authority) = ($1, $2, $3, $4, $5) WHERE id = $6",
        [first_name, last_name, phone, email, user_authority, id]
      );

      res.json(`${first_name} ${last_name} profile: updated successfully`);
    } catch (err) {
      console.log(`Failed to update user ${id}: `, "\n", err);
      res.status(400).json({
        msg: "Please review user update query"
      });
    } finally {
      await client.release();
    }
  },
  deleteUser: async (req, res) => {
    const {
      id
    } = req.params;


    try {
      const deleteUser = await client.query("DELETE FROM users WHERE id = $1", [
        id,
      ]);

      res.status(200).json({
        msg: `User ${id} succesfully deleted`
      });
    } catch (err) {
      console.log(`Failed to delete user ${id}: `, "\n", err);
      res.status(500).json({
        msg: `Project deletion of ${id} failed`
      });
    } finally {
      await client.release();
    }
  },
};