const { StatusCodes } = require('http-status-codes');

const has = require('has-keys');

const postService = require('../services/post.js');
const tokenData = require("../util/tokenData.js")

module.exports = {
    async getPostById(req, res){
        if(!has(req.params, 'id'))
            throw {code: StatusCodes.BAD_REQUEST, message: 'You must specify the post id'};

        let userId
        try  {
            userId = tokenData.tokenDataFromRequestCookie(req.cookies.session_token, "sub")
        } catch(err) {}

        const { id: postId } = req.params;
        const post = await postService.getPostByIdService({ userId, postId });

        res.status(StatusCodes.OK).json({status: true, message: 'Returning post', post});
    },
    async getPosts(req, res){
        const queries = req.query
        let userId
        try  {
            userId = tokenData.tokenDataFromRequestCookie(req.cookies.session_token, "sub")
        } catch(err) {}

        const posts = await postService.getPostsService({ userId, queries });

        res.status(StatusCodes.OK).json({status: true, message: 'Returning posts', posts});
    },
    async newPost(req, res){
        const data = req.body;

        const userId = await tokenData.tokenDataFromRequestCookie(req.cookies.session_token, "sub")
        
        await postService.newPostService({userId, data});

        res.status(StatusCodes.CREATED).json({status: true, message: 'Post created'});
    },
    async updatePost(req, res){
        if(!has(req.params, 'id'))
            throw {code: StatusCodes.BAD_REQUEST, message: 'You must specify the post id'};

        const { postId } = req.params;
        const data = req.body;
    
        const post = await postService.updatePostService({ postId, data });

        res.status(StatusCodes.OK).json({status: true, message: 'Post updated', post});
    },
    async deletePost(req, res){
        if(!has(req.params, 'id'))
            throw {code: StatusCodes.BAD_REQUEST, message: 'You must specify the id'};

        const { postId } = req.params;

        await postService.destroy({ postId });

        res.status(StatusCodes.OK).json({status: true, message: 'Post deleted'});
    }
}