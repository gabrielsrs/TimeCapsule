const jwt = require('jsonwebtoken');

module.exports = {
    async computeUserIdFromHeaders({ socket }) {
        const token = socket.handshake.headers.authorization?.split(' ')[1];

        if (!token) throw new Error("Missing token");

        // verify the JWT
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        return payload.userId;
    },
}