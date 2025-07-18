const jwt = require('jsonwebtoken');

module.exports = {
    async tokenDataFromSocket(socket, claim) {
        const token = socket.handshake.auth.token

        if (!token) throw new Error("Missing token")

        // verify the JWT
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if (claim) {
            if (!payload[claim]) throw new Error("Required claim not found")

            return payload[claim]
        }

        return payload
    },
    async tokenDataFromRequest(authorization, claim=undefined) {
        const token = authorization?.split(' ')[1]

        if (!token) throw new Error("Missing token")

        // verify the JWT
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if (claim) {
            if (!payload[claim]) throw new Error("Required claim not found")

            return payload[claim]
        }
        
        return payload
    },
    async token({ authorization }) {
        const token = authorization?.split(' ')[1]

        if (!token) throw new Error("Missing token") 

        jwt.verify(token, process.env.JWT_SECRET)

        return token
    }
}