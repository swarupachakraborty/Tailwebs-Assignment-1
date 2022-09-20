const jwt = require('jsonwebtoken');

auth = (req,res,next) => {
    try {
        let token = req.header('x-token');
        if(!token){
            return res.status(400).send({status:false,message:'token not found'});
        }
        let decode = jwt.verify(token,'jwtSecret');
        req.user = decode.user
        next()
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}
module.exports = auth