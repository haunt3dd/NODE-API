const jwt = require('jsonwebtoken');
const API_KEY = process.env.API_KEY;

exports.createToken = (req,res) => {
    let body = {
        id: req.body.id,
    }

    let token = jwt.sign({ id: body.id}, API_KEY,{
        expiresIn: 86400, // 24jam
    })
    return res.status(200).send({
        token: token,
    });
}