const { StatusCodes } = require('http-status-codes');

const has = require('has-keys');

const metadataService = require('../services/metadata.js');
const tokenData = require("../util/tokenData.js")

module.exports = {
    async getMetadata(req, res){
        let userId
        try  {
            userId = tokenData.tokenDataFromRequestCookie(req.cookies.session_token, "sub")
        } catch(err) {
            throw {code: StatusCodes.FORBIDDEN, message: 'User is not login'};
        }

        const metadata = await metadataService.getMetadataService({ userId });

        res.status(StatusCodes.OK).json({status: true, message: 'Returning metadata', metadata});
    },
    async newMetadata(req, res){
        if(!has(req.params, 'postId'))
            throw {code: StatusCodes.BAD_REQUEST, message: 'You must specify the postId'};

        const data = req.body
        const { postId } = req.params

        let userId
        try  {
            userId = tokenData.tokenDataFromRequestCookie(req.cookies.session_token, "sub")
        } catch(err) {
            throw {code: StatusCodes.FORBIDDEN, message: 'User is not login'};
        }
        
        await metadataService.newMetadataService({ userId, postId, data });

        res.status(StatusCodes.CREATED).json({status: true, message: 'Metadata created'});
    },
    async updateMetadata(req, res){
        if(!has(req.params, 'postId'))
            throw {code: StatusCodes.BAD_REQUEST, message: 'You must specify the postId'};

        const { postId } = req.params
        let userId
        try  {
            userId = tokenData.tokenDataFromRequestCookie(req.cookies.session_token, "sub")
        } catch(err) {
            throw {code: StatusCodes.FORBIDDEN, message: 'User is not login'};
        }
    
        const metadata = await metadataService.updateMetadataService({ userId, postId });

        res.status(StatusCodes.OK).json({status: true, message: 'Metadata updated', metadata});
    }
}