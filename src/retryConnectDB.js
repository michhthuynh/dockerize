
const pool = require('./db')
const connectPostgres = async () => {
    let retries = 5
    while (retries) {
        try {
            await pool.connect()
            console.log("Connected to database...")
            break
        } catch (error) {
            console.log(error)
            retries -= 1
            console.log("Retries left: ", retries)
            await new Promise(res => setTimeout(res, 5000))
        }
    }
    if (!retries) {
        console.log("Cannot connect to database")
        process.exit(1)
    }
}

module.exports = connectPostgres