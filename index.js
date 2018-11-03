const config = require('./config')
const mongoose = require('mongoose')
const restify = require('restify')

const server = restify.createServer()

// Destructuring of Config File 

const {PORT, MONGODB_URI} = config

// Middleware 

server.use(restify.plugins.bodyParser());


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
    console.log("Connected On Port", PORT)
})