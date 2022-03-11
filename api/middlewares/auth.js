const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === undefined){
        return res.status(401).send("Vous n'avez pas fourni de jeton d'authentification. Requête refusé");
    }
    let payload;
    try{
        payload = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = payload;
        next();
    }catch(error){
        res.status(403).send("Invalid token");
    }
};

module.exports = auth;
