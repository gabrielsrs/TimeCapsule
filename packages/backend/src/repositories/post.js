const { connect } = require("../routes/post")

module.exports = {
    async getPostByIdRepository({ id }){
        const post = await prisma.post.findUnique({
            where: { id },
        })

        return post
    },
    async getPostsRepository(){
        // add where
        const posts = await prisma.post.findMany()

        return posts
    },
    async newPostRepository({
        userId,
        title,
        content,
        publish,
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
                publish,
                publishDate,
                unpublish,
                unpublishDate,
                preview,
                previewMessage,
                authorId: userId,
                recipients,
                shareTo: {
                    connect: shareTo.map(userId => { id: userId })
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