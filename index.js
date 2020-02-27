// Import Server from server.js
const server = require("./api/server.js");

// Establish the Port for the server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **/n`));
