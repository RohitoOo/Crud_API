module.exports = server => {
    server.get('/users', (req,res,next) => {
        res.send({
            message : "Works!!"
        })
    })
}