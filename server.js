const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
.then(() => {
    console.log('Connection successful')
})
.catch(err => {
    console.log(err)
})