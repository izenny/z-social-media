const jwt = require('jsonwebtoken')

const VerifyToken = (req, res, next)=>{
    console.log("12",req.headers);
    let authHeader = req.headers.token;

    if (authHeader){
        const token = authHeader.split(" ")[1];
        console.log('token in verifyToken',token);
        jwt.verify(token, process.env.jwt_sec, (err, user)=>{
            if(err){
                return res.status(403).json("token and _id does'nt match");
            }
            console.log("user ..................",user);
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json({error : "token not fount"})
    } 
};


const verifyTokenandathorization = (req, res, next)=>{
console.log("*******************************",req.params.id);
console.log("*******************************",req.user.id);
        if (req.user.id === req.params.id){
            next()
        }else{
            return res.status(403).json("userid not match params.id")
        }
   
}

module.exports = { VerifyToken,verifyTokenandathorization }