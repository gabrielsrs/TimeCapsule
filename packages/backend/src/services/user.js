const status = require('http-status');
const userRepository = require('../repositories/user.js');

module.exports = {
    async newUserService(userId){        
        const validateUserExistence = await userRepository.getUserByIdRepository({ userId })

        if (validateUserExistence) {
            return {status: false, message: "User already created"}
        }

        const user = await userRepository.newUserRepository({ userId });

        return user
    }
}