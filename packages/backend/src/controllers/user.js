const { StatusCodes } = require('http-status-codes');

const userService = require('../services/user.js');


module.exports = {
    async newUser(req, res){
        await userService.newUserService({ userId });

        res.status(StatusCodes.CREATED).json({status: true, message: 'User Added'});
    }
}
