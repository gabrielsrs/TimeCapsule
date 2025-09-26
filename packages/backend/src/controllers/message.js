const { StatusCodes } = require('http-status-codes');

const has = require('has-keys');

const messageService = require('../services/message.js');
const postService = require('../services/post.js')

module.exports = {
    async getMessageById(req, res){

    },
    async getMessages({ data }){
        if (!has(data, 'userId'))
            throw {code: StatusCodes.UNAUTHORIZED, message: 'You must specify the user id'};

        if (!has(data, 'postId'))
            throw {code: StatusCodes.BAD_REQUEST, message: 'You must specify the post id'};
            
        const post = await postService.getPostByIdService({ userId: data.userId, postId: data.postId })


        if (post.recipients == 'PERSONAL') {
            const newMessage = await messageService.getMessagesService({ userId: data.userId, postId: data.postId })

            return newMessage
        } else {
            const tempMessage = await messageService.getTempMessageService({ userId: data.userId, postId: data.postId })

            return tempMessage
        }

    },
    async newMessage({ data }){
        if (!has(data, 'userId'))
            throw {code: StatusCodes.UNAUTHORIZED, message: 'You must specify the user id'};

        if (!has(data, 'postId'))
            throw {code: StatusCodes.BAD_REQUEST, message: 'You must specify the post id'};
            
        const post = await postService.getPostByIdService({ userId: data.userId, postId: data.postId })


        if (post.recipients == 'PERSONAL') {
            const newMessage = await messageService.newMessageService({ data })
        } else {
            const tempMessage = await messageService.newTempMessageService({ data })
        }
    },
    async updateMessage(req, res){

    },
    async deleteMessage(req, res){

    }
}