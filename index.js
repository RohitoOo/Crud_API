const config = require('./config')
const mongoose = require('mongoose')
const restify = require('restify')
const rjwt = require('restify-jwt-community')
const server = restify.createServer()

// Destructuring of Config File 

const { PORT, MONGODB_URI } = config

// Resitify Middleware 

server.use(restify.plugins.bodyParser());

// Protect Routes

server.use(rjwt({secret: config.JWT_SECRET}).unless({ path: ['/auth']}))


server.listen(PORT , () => {
    mongoose.connect(
        MONGODB_URI,
        { useNewUrlParser: true }
    )
})

const db = mongoose.connection;

db.on('error', (err) => console.log(err))

db.once('open' , () => {
    require('./routes/customers')(server)
    require('./routes/users')(server)
    console.log("Connected On Port", PORT)
})