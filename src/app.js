const express = require('express')
require('./retryConnectDB')()
const pool = require('./db')
const app = express()
app.use(express.json())

app.post('/', async (req, resp) => {
    const { description } = req.body
    try {
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) returning *", [description])
        resp.json({
            data: newTodo
        })
    } catch (error) {
        console.log(error)
        resp.sendStatus(500)
    }
})

app.get('/', async (req, resp) => {
    try {
        const data = await pool.query("SELECT * FROM todo")
        resp.json({
            data: data.rows
        })
    } catch (error) {
        console.log(error)
        resp.sendStatus(500)
    }
})

app.listen(3000, () => console.log('running'))