const jsonwebtoken = require("jsonwebtoken");
const jwtManager = (user) => {

    //Authorization using jsonwebtoken
    const accessToken = jsonwebtoken.sign(
        {
            id: user._id,
            name: user.name,
            // balance: user.balance,
        },
        process.env.jwt_salt,
        {
            expiresIn: '1d',
        }
    );

    return accessToken

};

module.exports = jwtManager;