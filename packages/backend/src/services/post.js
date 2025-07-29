const { StatusCodes } = require('http-status-codes');
const { z } = require("zod")
const { Recipients } = require("../../generate/prisma/client.js")

const postRepository = require('../repositories/post.js');

const postSchema = z.object({
    title: z.string().min(4).max(80),
    content: z.string().max(2000).optional(),
    mediaUrls: z.array(z.string().url())
    .optional().transform(val => val ? JSON.stringify(val) : undefined),
    published: z.boolean().optional().default(false),
    preview: z.boolean().optional().default(false),
    previewMessage: z.string().max(100).optional(),
    shareTo: z.array(z.string().url()).optional().default([])
})

module.exports = {
    async getPostByIdService({ userId, postId }){
        const enableUser = []

        if(userId) {
            enableUser.push({
                "shareTo": { "some": { "authId": userId } },
            },{
                "authorId": { "equals": userId }
            },{
                "recipients": { "equals": "PUBLIC" }
            })
        } else {
            enableUser.push({
                "recipients": { "equals": "PUBLIC" }
            })
        }

        const filter = {id: Number(postId) , AND: [
            {
                OR: enableUser
            }
        ]}

        const post = await postRepository.getPostByIdRepository({ filter });

        if (!post)
            throw {code: StatusCodes.NOT_FOUND, message: 'Post id not correspond to any post'};

        return post
    },
    async getPostsService({ userId, queries }){
        const enableUser = []

        if(userId) {
            enableUser.push({
                "shareTo": { "some": { "authId": userId } },
            },{
                "authorId": { "equals": userId }
            },{
                "recipients": { "equals": "PUBLIC" }
            })
        } else {
            enableUser.push({
                "recipients": { "equals": "PUBLIC" }
            })
        }

        const queryFIlter = []

        if(queries?.recipients) {
            const recipients = queries.recipients
            queryFIlter.push({
                "recipients": { "in": typeof recipients == "string"
                    ?[recipients.toUpperCase()]
                    :recipients.map(recipient => recipient.toUpperCase())
                }
            })
        }

        if(queries?.users) {
            queryFIlter.push({
                "authorId": { "in": typeof users == "string"? [queries.users]: queries.users}
            })
        }

        if(queries?.from) {
            queryFIlter.push({
                "publishDate": { "gte": new Date(queries.from) }
            })
        }

        if(queries?.to) {
            queryFIlter.push({
                "publishDate": { "lte": new Date(queries.to) }
            })
        }
        
        const filter = { AND: [
            {
                OR: enableUser
            },
            {
                AND: queryFIlter
            }
        ]}

        const posts = await postRepository.getPostsRepository({ filter });

        if (!posts)
            throw {code: StatusCodes.NOT_FOUND, message: 'That is not post yet'};

        return posts
    },
    async newPostService({ userId, data }){
        if(!userId)
            throw {code: StatusCodes.FORBIDDEN, message: 'User is not login'};

        const createPostSchema = postSchema.extend({
            recipients: z.enum([Recipients.PERSONAL, Recipients.SHARED, Recipients.PUBLIC])
            .optional().default(Recipients.PERSONAL),
            publishDate: z.string().datetime().default(() => new Date().toISOString()),
            unpublish: z.boolean().optional().default(false),
            unpublishDate: z.string().datetime().optional(),
        })

        const postData = createPostSchema.parse(data)
        
        const post = await postRepository.newPostRepository({ userId, ...postData });

        return postData
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
        //add post in metadata if is PERSONAL or SHARED

        return possUpdated
    },
    async deletePostService({ postId }){
        const post = await postRepository.deletePostRepository({ postId })

        return post
    }
}



