const { prisma } = require("./prismaClient")

module.exports = {
    async getUserByIdRepository({ authId }){
        const user = await prisma.user.findUnique({
            where: { authId },
        })

        return user
    },
    async newUserRepository({ authId }){
        const user = await prisma.user.create({
            data: { authId },
        })

        return user
    }
}