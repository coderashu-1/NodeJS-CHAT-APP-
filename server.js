const express = require('express')
const apps = express()
const http = require('http').createServer(apps)

const port = process.env.port || 3000

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

apps.use(express.static(__dirname + '/public'))

apps.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})