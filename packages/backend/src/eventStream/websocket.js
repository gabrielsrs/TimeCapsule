const { Server } = require("socket.io");
const { tokenDataFromSocket } = require("../util/tokenData.js")

module.exports = function setupWebSocket(server){
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    })

    io.on("connection", socket => {
        socket.on("enterPostChat", postId => { // use computeUserIdFromHeaders to userId
            // validations if user in in this post
            const rooms = io.of("/").adapter.rooms
            const addRoom = !rooms.has(postId)

            for(const room of rooms) {
                if(!io.sockets.sockets.has(room[0])) {
                    socket.leave(room[0])
                }
            }

            if(addRoom) {
                socket.join(postId)
            }

            // load messages
        })

        socket.on("message", async messageObj => {
            // validations if user in in this post
            // validate if is message with publish date

            const data = await tokenDataFromSocket(socket)

            io.to(messageObj.postId).emit("message", {
                message: messageObj.message,
                name: data.user_metadata.name,
                userId: data.sub
            })

            // save messages
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
