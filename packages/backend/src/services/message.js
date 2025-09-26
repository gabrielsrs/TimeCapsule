const redisRepository = require('../repositories/redis.js');
const messageRepository = require('../repositories/message.js');
const messageTimeExpire = require('../util/messageTimeExpire.js');
const crypto = require("crypto")
const { z } = require("zod")

module.exports = {
    async getMessagesService({ userId, postId }){        
        const filter = { AND: [{ userId }, { postId }]}

        const messages = await messageRepository.getMessagesRepository({ filter });

        if (!messages)
            throw {code: StatusCodes.NOT_FOUND, message: 'That is not messages yet'};

        return messages
    },
    async getTempMessageService({ userId, postId }){
        const data = await redisRepository.getAllDataRepository({
            key: `postId:${postId}:messages`
        })

        const messages = []

        for(const messageId of Object.entries(data)) {
            const [key, value] = messageId

            const message = await redisRepository.getAllDataRepository({ key: value })
            if (!Object.entries(message).length) {
                await redisRepository.hDelDataRepository({ key: `postId:${postId}:messages`, value: key })

                continue
            }

            const messageTTL = await  redisRepository.ttlDataRepository({ key: value })

            if(message.userId != userId && messageTTL == -1) {
                await redisRepository.expireDataRepository({
                    key: value,
                    expire: message.messageExpire
                })
            }

            messages.push(message)
        }

        return messages
    },
    async newMessageService({ data }){ //postgres messages
        const createMessageSchema = z.object({
            message: z.string(),
            sended: z.boolean().optional().default(true),
            sendDate: z.string().datetime().optional().default(() => new Date().toISOString()),
            deleted: z.boolean().optional().default(false),
            deletedDate: z.string().datetime().optional(),
            userId: z.string(),
            postId: z.number(),
        })

        const messageData = createMessageSchema.parse(data)
        
        const message = await messageRepository.newMessageRepository({ ...messageData })

        return messageData

    },
    async newTempMessageService({ data, sockets }) { //redis messages
        data.messageExpire = messageTimeExpire.messageTimeExpire({
            messageType: "text", message: data.message
        })

        const uuid = crypto.randomUUID();

        const documentId = `postId:${data.postId}:userId:${data.userId}:messageId:${uuid}`

        await redisRepository.hSetDataRepository({
            key: documentId,
            value: data
        })

        await redisRepository.hSetDataRepository({
            key: `postId:${data.postId}:messages`,
            value: {[uuid]: documentId}
        })


        if(data.userInRoomCount > 1) { // Validate how many users in the room(to add expire just if is more than the proper user)
            await redisRepository.expireDataRepository({
                key: documentId,
                expire: data.messageExpire
            })
        }
        
    }, 
    async updateMessageService({  }){
        return ''
    },
    async deleteMessageService({  }){
        return ''
    }
}
