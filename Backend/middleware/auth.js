const jwt = require("jsonwebtoken");

function auth(req,res,next){
    try{

        console.log(req.cookies.token);
        console.log("OK")
        const token = req.cookies.token;  

        if(!token)
            res.status(500).json({erMsg : "Unauthorized"});

        const verify = jwt.verify(token,process.env.JWT_SECRET);
        console.log(verify)

        req.user = verify.user

        next();

    }catch(err){
        console.error(err);
        res.status(500).json({erMsg : "Unauthorized"});
    }
}

module.exports = auth;