const jwt = require("jsonwebtoken");
const secret = "medconnect2024!";

module.exports = function(req, res, next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        const token = bearer[1];

        try{
            jwt.verify(token,secret);
            next();
        }catch(err){
            res.status(403);
            res.json({
                status: false,
                message: "Você não esta autenticado."
            });
            return;
        }
    }else{
        res.status(403);
        res.json({
            status: false,
            message: "Você não esta autenticado."
        });
        return;
    }
}