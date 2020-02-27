// Import Dependencies
const router = require("express").Router(); // Always add .Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import Models/Middleware
const Users = require("../users/users-model.js");
const { jwtSecret } = require("../config/secrets");

// Build endpoints
router.post("/register", (request, response) => {
  let user = request.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      Users.findById(saved[0]).then(save => {
        response.status(201).json(save);
      });
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ errorMessage: "Failed to register user to the database" });
    });
});

router.post("/login", (request, response) => {
  let { username, password } = request.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        response.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        response.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ errorMessage: "Failed to login user" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department || "user"
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
