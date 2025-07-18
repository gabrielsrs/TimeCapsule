const { StatusCodes } = require('http-status-codes');
const { z } = require("zod")
const { Recipients } = require("@prisma/client")

const postRepository = require('../repositories/post.js');

const postSchema = z.object({
    title: z.string().min(4).max(80),
    content: z.string().max(2000).optional(),
    mediaUrls: z.array(z.string().url()).optional().pipe(
        z.transformer(val => JSON.stringify(val))
    ),
    published: z.boolean().optional().default(false),
    preview: z.boolean().optional().default(false),
    previewMessage: z.string().max(100).optional(),
    shareTo: z.array(z.string()).optional()
})

module.exports = {
    async getPostByIdService({ userId, postId }){
        const post = await postRepository.getPostByIdRepository({ postId });

        if (!post)
            throw {code: StatusCodes.NOT_FOUND, message: 'Post id not correspond to any post'};

        if (post.recipients == Recipients.PERSONAL && userId != post.authorId)
            throw {code: StatusCodes.FORBIDDEN, message: 'This User do not have access to this post'};

        if (post.recipients == Recipients.SHARED && userId != post.authorId || !post.shareTo.includes(userId))// post.shareTo: not a array
            throw {code: StatusCodes.FORBIDDEN, message: 'This User do not have access to this post'};

        return post
    },
    async getPostsService({ userId }){
        // validate recipients, ...
        const posts = await postRepository.getPostsRepository();

        if (!posts)
            throw {code: StatusCodes.NOT_FOUND, message: 'That is not post yet'};

        return posts
    },
    async newPostService({ userId, data }){
        const createPostSchema = postSchema.extend({
            recipients: z.enum([Recipients.PERSONAL, Recipients.SHARED, Recipients.PUBLIC])
            .optional().default(Recipients.PERSONAL),
            publishDate: z.iso.datetime().default(new Date().toISOString()),
            unpublish: z.boolean().optional().default(false),
            unpublishDate: z.iso.datetime().optional(),
        })

        const postData = createPostSchema.parse(data)
        
        const post = await postRepository.newPostRepository({ userId, ...postData });

        return post
    },
    async updatePostService({ postId, data }){
        const updatePostSchema = postSchema.partial()
        const postData = updatePostSchema.parse(data)

        const post = await postRepository.getPostByIdRepository({ postId });

        if (!post)
            throw {code: StatusCodes.NOT_FOUND, message: 'Post id not correspond to any post'};

        // validate if post is from user

        if (!post.published && postData.title || postData.content || postData.mediaUrls)
            throw {code: StatusCodes.UNPROCESSABLE_ENTITY, message: 'Title, content and media URLs just can be updated after post is published'};

        const shareTo = postData.shareTo
        if (shareTo) {
            // validate id
            postData.shareTo = {
                connect: [...post.shareTo, ...shareTo.map(userId => { id: userId })] // post.shareTo: not a array
            }

        }

        const possUpdated = await postRepository.updatePostRepository({ postId, postData })

        return possUpdated
    },
    async deletePostService({ postId }){
        const post = await postRepository.deletePostRepository({ postId })

        return post
    }
}



