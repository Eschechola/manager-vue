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
        const token = req.headers['authorization'].split(' ')[1];
        
        if (!token)
            return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if (err){
                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            }
            
            req.id = decoded.id;
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