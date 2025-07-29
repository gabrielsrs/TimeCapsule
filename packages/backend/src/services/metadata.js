const { StatusCodes } = require('http-status-codes');
const { z } = require("zod")

const metadataRepository = require('../repositories/metadata.js');

module.exports = {
    async getMetadataService({ userId }){        
        const filter = userId? {"userId": { "equals": userId } }: {}

        const metadata = await metadataRepository.getMetadataRepository({ filter });

        if (!metadata)
            throw {code: StatusCodes.NOT_FOUND, message: 'This user not enter in a chat yet'};

        for(const entityPos in metadata) {
            const postsCount = await metadataRepository.getPostMessageCountRepository({ postId: metadata[entityPos].postId });

            metadata[entityPos].postsCount = postsCount
        }

        return metadata
    },
    async newMetadataService({ userId, postId, data }){


        const createMetadataSchema = z.object({
            startCount: z.boolean().optional().default(false)
            .transform(val => val? 1: 0),
        })

        const metadataData = createMetadataSchema.parse(data)
        
        const metadata = await metadataRepository.newMetadataRepository({
            userId,
            postId: Number(postId),
            messagesCount: metadataData.startCount
        });

        return metadata
    },
    async updateMetadataService({ userId, postId }){
        if(!userId)
            throw {code: StatusCodes.FORBIDDEN, message: 'User is not login'};

        if(!postId)
            throw {code: StatusCodes.FORBIDDEN, message: 'You must specify the postId'};
        const possUpdated = await metadataRepository.updateMetadataRepository({ userId, postId })

        return possUpdated
    }
}



