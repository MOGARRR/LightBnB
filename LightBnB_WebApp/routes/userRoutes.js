const express = require("express");
const bcrypt = require("bcrypt");
const database = require("../db/database");
const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "lightbnb",
});



const router = express.Router();

// Create a new user
router.post("/", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  database
    .addUser(user)
    .then((user) => {
      const name = req.body.name;
      const email = req.body.email;
      const password = user.password;
      const values = [name,email,password];
      console.log(values);

      const queryString = `
      INSERT INTO users (name,email,password)
      VALUES ($1,$2,$3)
      RETURNING *;
      `;
      return pool
      .query(queryString,values).then((results) => {
        user = results.rows[0];
        if (!user) {
          return res.send({ error: "error" });
        }

        req.session.userId = user.id;
        res.send({user});
        return user;
      }).catch((err) => {
        console.log(err.message);
      });

   
    })
});

// Log a user in
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  database.getUserWithEmail(email).then((user) => {
    const values = [email];
    const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
    ;`;

    return pool
    .query(queryString,values).then((result) => {
      user = result.rows[0];
      if (!user) {
        console.log(null);
        return null;
      }
      if (!bcrypt.compareSync(password, user.password)) { // FIGURE OUT ERROR HERE
        return res.send({ error: "error" });
      }  
      console.log(user);
      req.session.userId = user.id;
      res.send({user});
      return user;

    }).catch((err) => {
      console.log(err.message);
    });
  });
});

// Log a user out
router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.send({});
});

// Return information about the current user (based on cookie value)
router.get("/me", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ message: "not logged in" });
  }

  database
    .getUserWithId(userId)
    .then((user) => {
      const values = [userId];
      const queryString = `
      SELECT *
      FROM users
      WHERE id = $1
      ;`;

      return pool
      .query(queryString,values).then((result) => {
        user = result.rows[0];
        if (!user) {
          console.log(null);
          return null;
        }
        req.session.userId = user.id;
        res.send({user});
        return user;
      }).catch((err) => {
        console.log(err.message);
      })
    })
});

module.exports = router;
