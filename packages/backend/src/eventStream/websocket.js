const { Server } = require("socket.io");
const { tokenDataFromSocket } = require("../util/tokenData.js")
const { updateMetadataService } = require("../services/metadata.js")
const messageController = require('../controllers/message.js');


module.exports = function setupWebSocket(server){
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    })

    io.on("connection", socket => {
        socket.on("enterPostChat", async postId => { // use computeUserIdFromHeaders to userId
            // validations if user in in this post
            for(const room of socket.rooms) {
                if(room != socket.id) {
                    socket.leave(room)
                }
            }

            socket.join(Number(postId))

            const userData = await tokenDataFromSocket(socket)

            const data = {
                userId: userData.sub,
                postId
            }

            // load messages
            const messages = await messageController.getMessages({ data })

            io.emit("loadMessages", messages)
        })

        socket.on("message", async messageObj => {
            // validations if user in in this post
            // validate if is message with publish date
            const sockets = await io.in(messageObj.postId).fetchSockets();


            const userData = await tokenDataFromSocket(socket)

            const data = {
                ...messageObj,
                name: userData.user_metadata.name,
                avatar_url: userData.user_metadata.avatar_url,
                userId: userData.sub,
            }

            const rooms = io.of("/").adapter.rooms
            
            if (rooms.has(messageObj.postId) && rooms.get(messageObj.postId).has(socket.id)) {
                data.userInRoomCount = rooms.get(messageObj.postId).size

                io.to(messageObj.postId).emit("message", data)

                messageController.newMessage({ data, sockets })

            }

        })

        socket.on("leavePostChat", postId => { 
            socket.leave(postId)
        })

        socket.on("status", () => {
            console.log("status")
            
            const data = tokenDataFromSocket(socket)
                .then(res => console.log(res))
                .catch(err => console.log(err.message))
            


            io.emit("status", "ok")
        })
    })
}
