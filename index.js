const express = require('express')
const app = express()
const router = require('./router/registerRouter')
const path = require('path')

// connecting env file
const dotenv = require('dotenv')
dotenv.config({path : "./config.env"})
const cors = require('cors')





const mongoose = require('mongoose')
const { fileURLToPath } = require('url')
// connecting db
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully')
}).catch((err) => {
    console.log("Error Occured: ", err)
})

const PORT = process.env.PORT || 5050



// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the React app in client/register/build
app.use(express.static(path.join(__dirname, 'register/build')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'register/build', 'index.html'));
});

// route middleware
app.use('/users', router)

app.use((err,req, res, next)=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'fail'
    res.status(err.statusCode).json({
        'status': err.status,
        'message': err.message 
    })
})


app.listen(PORT, () => {
    console.log('App is running')
})
