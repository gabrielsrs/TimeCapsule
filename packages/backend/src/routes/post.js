const express = require('express');
const router = express.Router();


const post = require('../controllers/post.js');



router.get('/api/posts/:id', post.getPostById);

router.get('/api/posts', post.getPosts);

router.post('/api/posts', post.newPost);

router.delete('/posts/:id', post.deletePost);

router.put('/api/posts', post.updatePost);


module.exports = router;