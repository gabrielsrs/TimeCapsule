const express = require('express');
const router = express.Router();


const metadata = require('../controllers/metadata.js');

router.get('/api/metadata', metadata.getMetadata);

router.post('/api/metadata/:postId', metadata.newMetadata);

router.patch('/api/metadata/:postId', metadata.updateMetadata);


module.exports = router;