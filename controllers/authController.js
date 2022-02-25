const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('authorization-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const userVerified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = userVerified;
        next();
    }catch(err){
        res.status(401).send('Access Denied');
    };

    if(req.user.admin){
        res.send('This data should only be accessed by the admin');
    }else{
        res.status(401).send('Not Admin: Access Denied');
    };
};

module.exports = auth;