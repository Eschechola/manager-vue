require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

class TokenMiddleware{
    generateToken(id, name, email){
        const token = jwt.sign(
            { id, name, email,  },
            process.env.TOKEN_SECRET,
            {
                expiresIn: 36000                
            }
        );

        return token;
    }

    verifyToken(req, res, next){
        var token = req.headers['authorization'] || req.headers['Authorization'];
        
        if (!token)
            res.status(401).send({
                message: "Token not found.",
                success: false,
                data: null
            });
        
        // removes "Bearer" word and mantains only token
        token = token.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if (err)
                res.status(401).send({
                    message: "Token is invalid or expired.",
                    success: false,
                    data: null
                });
                
            next();
        });   
    }

    getCustomerAuthenticatedData(req){
        const token = req.headers['authorization'].split(' ')[1];
        const customerData = jwt.decode(token);
        
        return {
            id: customerData.id,
            name: customerData.name,
            email: customerData.email,
            token: token,
        };
    }
}

module.exports = new TokenMiddleware();