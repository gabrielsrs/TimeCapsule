const { StatusCodes } = require('http-status-codes');

const userService = require('../services/users.js');


module.exports = {
    async newUser(req, res){
        await userService.newUserService({ userId });

        res.status(StatusCodes.CREATED).json({status: true, message: 'User Added'});
    }
}
