const auth = require("../../auth");
const db = require("../../db");
const debug = require("debug")("core:endpoints:user:signin");

// POST /user/signin
/*
    {
        "email": "dansk99@outlook.com",
        "password": "dansk99"
    }
*/
module.exports = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [ user ] = await db.queryProm("SELECT userId, hashedPassword FROM users WHERE email=?", [ email ], true);
        
        if (!user)
            return res.status(401).send("wrong email");

        
        if (auth.getPasswordHash(user.userId, password) == user.hashedPassword) {
            const tok = await auth.generateToken(user.userId, 0);
            res.send(tok);
        } else {
            res.status(401).send("wrong password");
        }

    } catch (e) {
        res.status(500).send(e);
    }
};