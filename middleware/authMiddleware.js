const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.TOKEN_SECRET;

module.exports = function(req, res, next){
    const token = req.headers['x-access-token'];
  
    if (token) {
        jwt.verify(token, accessTokenSecret, (err, decode) => {
            if (err) {
                return res.status(403).json({error:'Invalid token'});
            }
            req.userId = decode.userId;
            next();
        });
    } else {
        return res.status(401).json({error:'unauthorized'});
    }
  };