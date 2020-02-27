Step 1) Set up server.js:

- Import dependencies, routers, server, middleware
- Establish Paths(Routes)
- Create server test function to test if the server is running
- Export the whole file as server (modules.export)

** NOTE: Server will have an error right now as the router files are empty **

Step 2) Create Knex file:

- Within the terminal run: npm i -g knex
- After: knex init (creates knexfile.js)
- Open knexfile.js, configure the connection:
  development: {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: { (determines where db3 file goes)
  filename: './database/auth.db3',
  },
  pool: { (always needed)
  afterCreate: (conn, done) => {
  conn.run('PRAGMA foreign_keys = ON', done);
  },
  },
  migrations: { (determines where migrations directory goes)
  directory: './database/migrations',
  },
  seeds: { (determines where seed directory goes)
  directory: './database/seeds',
  },
  },

Step 3) Create table(s):

- Within the terminal run: knex migrate:make add_users_table (table varies depending on what you're building)
- After: knex migrate:latest
- Build dbConfig.js
