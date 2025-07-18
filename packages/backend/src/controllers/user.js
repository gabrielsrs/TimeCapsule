const { StatusCodes } = require('http-status-codes');

const userService = require('../services/user.js');
<<<<<<< Updated upstream
=======
const tokenData = require("../util/tokenData.js")
>>>>>>> Stashed changes


module.exports = {
    async newUser(req, res){
        const userId = await tokenData.tokenDataFromRequest(req.headers.authorization, "sub")
        const createUser = await userService.newUserService({ userId });

        let message
        createUser.status == false && (message = createUser.message)

        res.cookie("session_token", tokenData.token(req.headers.authorization), {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 3600 * 1000
        });

        res.status(StatusCodes.CREATED).json({status: true, message: message || 'User Added'});
    }
}
