const { Server } = require("socket.io");

module.exports = function setupWebSocket(server){
    const io = new Server(server);

    io.on("connection", socket => {
        socket.on("enterPostChat", postId => { // use computeUserIdFromHeaders to userId
            // validations if user in in this post

            socket.join(postId)

            // load messages
        })

        socket.on("message", (postId, message) => {
            // validations if user in in this post

            // https://socket.io/docs/v3/rooms/#:~:text=//%20main%20namespace%0Aconst%20rooms%20%3D%20io.of(%22/%22).adapter.rooms%3B
            const rooms = io.of("/").adapter.rooms; 

            io.to(postId).emit("message", message)

            // save messages
        })

        socket.on("leavePostChat", postId => { 
            socket.leave(postId)
        })
    })
}
