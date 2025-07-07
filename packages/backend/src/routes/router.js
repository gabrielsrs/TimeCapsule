const router = require('express').Router();


// Users routes

router.use(require('./user'));
router.use(require('./post'));


module.exports = router;