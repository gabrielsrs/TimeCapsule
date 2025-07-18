const { StatusCodes } = require('http-status-codes');

const has = require('has-keys');

const postService = require('../services/post.js');
<<<<<<< Updated upstream
=======
const tokenData = require("../util/tokenData.js")
>>>>>>> Stashed changes


module.exports = {
    async getPostById(req, res){
        if(!has(req.params, 'id'))
            throw {code: StatusCodes.BAD_REQUEST, message: 'You must specify the post id'};

        const { postId } = req.params;
        const post = await postService.getPostByIdService({ postId });

        res.status(StatusCodes.OK).json({status: true, message: 'Returning post', post});
    },
    async getPosts(req, res){

        let userId
        try  {
            userId = tokenData.tokenDataFromRequest(res.cookies.session_token, "sub")
        } catch(err) {}

        const posts = await postService.getPostsService({ userId });

        res.status(StatusCodes.OK).json({status: true, message: 'Returning posts', posts});
    },
    async newPost(req, res){
        const data = req.body;

        const userId = tokenData.tokenDataFromRequest(res.cookies.session_token, "sub")
        
        await postService.create({userId, data});

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
