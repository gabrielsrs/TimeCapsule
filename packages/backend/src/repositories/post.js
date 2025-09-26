const { prisma } = require("./prismaClient")

module.exports = {
    async getPostByIdRepository({ filter }){
        const post = await prisma.post.findUnique({
            where: filter
        })

        return post
    },
    async getPostsRepository({ filter }){
        const posts = await prisma.post.findMany({ 
            where: filter
        })

        return posts
    },
    async newPostRepository({
        userId,
        title,
        content,
        mediaUrls,
        published,
        publishDate,
        unpublish,
        unpublishDate,
        preview,
        previewMessage,
        recipients,
        shareTo
    }){
        const post = await prisma.post.create({
            data: {
                title,
                content,
                mediaUrls,
                published,
                publishDate,
                unpublish,
                unpublishDate,
                preview,
                previewMessage,
                authorId: userId,
                recipients,
                shareTo: {
                    connect: shareTo.map(userId => { authId: userId })
                }
            },
        })

        return post
    },
    async updatePostRepository({ postId, toUpdate }){
        const updatePost = await prisma.post.update({
            where: { postId },
            data: toUpdate,
        })

        return updatePost
    },
    async deletePostRepository({ postId }){
        const deletePost = await prisma.post.delete({
            where: { postId },
        })

        return deletePost
    }
}