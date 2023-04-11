const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const propositionROutes = require('./routes/propositionRoutes')

// express App
const app = express()

// middleware
app.use(express.json(
    {limit: '50mb'}
))

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/proposition', propositionROutes)

// connecting to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // App listening
        app.listen(process.env.PORT, () => {
            console.log('App connect to DB & listening on port : ', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })
