const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "db",
    database: "todo_database",
    port: 5432
})

module.exports = pool