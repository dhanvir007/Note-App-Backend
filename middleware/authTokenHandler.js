const jwt = require('jsonwebtoken')

const authToken = async (req, res, next) => {
    try {
        let authHeader = req.headers.authorization || req.headers.Authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            let token = authHeader.split(" ")[1];
            const decode = jwt.verify(token, process.env.SECRET_TOKKEN, (error, decode) => {
                if (error) {
                    // return res.status(404).json({ message: "User is not Authorized !!" })
                    throw new Error ("User is not Authorized..!!")
                }
                req.id = decode.id;
                next();
            }
            );
            if(!token) {
                throw new Error ("User is not Authorized or Token is missing")
            }
        }


    } catch (error) {
        res.send({message : error.message})
    }


}
module.exports = authToken;