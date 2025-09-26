const { prisma } = require("./prismaClient")

module.exports = {
    async getMessageByIdRepository({ id }){
        const message = await prisma.message.findUnique({
            where: { id },
        })

        return message
    },
    async getMessagesRepository({ filter }){
        const messages = await prisma.message.findMany({ 
            where: filter
        })

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
        const newMessage = await prisma.message.create({
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

        return newMessage
    },
    async deleteMessageRepository({ messageId }){
        const deleteMessage = await prisma.message.delete({
            where: { messageId },
        })

        return deleteMessage
    }
}