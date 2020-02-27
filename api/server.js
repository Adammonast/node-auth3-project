// Import Dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Import Routers
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const restricted = require("../auth/restricted-middleware.js");

// Import Server
const server = express();

// Import Middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

// Establish Paths(Routes)
server.use("/api/auth", authRouter); // Pass in AuthRouter for Authorized Paths
server.use("/api/users", restricted, checkDepartment("user"), usersRouter); // Pass in Restricted before UsersRouter to establish the UsersRouter is retriced

// Test that the Server is running
server.get("/", (request, response) => {
  response.send("Server is working");
});

module.exports = server; // Export whole file as "server"

function checkDepartment(department) {
  return (request, response, next) => {
    if (
      request.decodedToken &&
      request.decodedToken.department &&
      request.decodedToken.department.toLowerCase() === department
    ) {
      next();
    } else {
      response.status(403).json({ error: "you shall not pass" });
    }
  };
}
