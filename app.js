const express = require('express')
require('dotenv').config()
const productsRouter = require('./routes/productsRouter')
const customError = require('./utils/customError')

require('./server')
require('./populate')

const app = express()
console.log(process.env.DATABASE_CONNECTION_STRING)
app.use('/products', productsRouter)

app.use('*', (req,res,next) => {
    next(new customError('Invalid URL', 404))
})

app.use((err,req,res,next) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})