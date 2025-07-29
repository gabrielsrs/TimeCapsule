const { prisma } = require("./prismaClient")

module.exports = {
    async getMessageByIdRepository({ id }){
        const message = await prisma.message.findUnique({
            where: { id },
        })

        return message
    },
    async getMessagesRepository(){
        const messages = await prisma.message.findMany()

        return messages
    },
    async newMessageRepository({
        message,
        sended,
        sendDate,
        deleted,
        deletedDate,
        userId,
        postId,
    }){
        const message = await prisma.message.create({
            data: {
                message,
                sended,
                sendDate,
                deleted,
                deletedDate,
                userId,
                postId,
            },
        })

        return message
    },
    async deleteMessageRepository({ messageId }){
        const deleteMessage = await prisma.message.delete({
            where: { messageId },
        })

        return deleteMessage
    }
}