require('dotenv').config()
const express = require('express')
const sequalize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000

const app = express()



const start = async () => {
    try {
        await sequalize.authenticate()
        await sequalize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()