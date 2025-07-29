const { prisma } = require("./prismaClient")

module.exports = {
    async getMetadataRepository({ filter }){
        const metadata = await prisma.metadata.findMany({ 
            where: filter
        })

        return metadata
    },
    async getPostMessageCountRepository({ postId }){
        const postCount = await prisma.metadata.aggregate({
            _sum: {
                messagesCount: true,
            },
            where: {
                "postId": { "equals": postId }
            }
        })

        return postCount
    },
    async newMetadataRepository({
        userId,
        postId,
        messagesCount
    }){
        const metadata = await prisma.metadata.create({
            data: {
                userId,
                postId,
                messagesCount
            },
        })

        return metadata
    },
    async updateMetadataRepository({ userId, postId }){
        const updateMetadata = await prisma.metadata.update({
            where: { AND: [
                { "userId": { "equals": userId } },
                { "postId": { "equals": postId } }
            ] },
            data: {
                messagesCount: {
                    increment: 1,
                },
            },
        })

        return updateMetadata
    }
}
