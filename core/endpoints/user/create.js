const debug = require("debug")("core:user:create");
const db = require("../../db");
const auth = require("../../auth");

/* POST /user/create
{
    "email" : "dansk99@outlook.com"
    "name" : "Bob Marley",
    "phone" : "023423214",
    "password" : "password_before_hash"
}
*/
module.exports = async (req, res) => {
    const { email, name, phone, password } = req.body;

    // check missing
    if (!email)
        return res.status(400).send("missing email");
    if (!name)
        return res.status(400).send("missing name");
    if (!phone)
        return res.status(400).send("missing phone number");
    if (!password)
        return res.status(400).send("missing password");

    if (!validator.isEmail("" + email))
        return res.status(400).send("Invalid email");
    
    // check if email is already used
    const dupEmail = await db.queryProm("SELECT 1 FROM users WHERE email=?", [ email ], true);
    if (dupEmail instanceof Error)
        return res.status(500).send(dupEmail.error);
    if (dupEmail.length) {
        debug("duplicate email: %s", email);
        return res.status(400).send(`email '${email}' already in use, log in instead`);
    }

    for (; ;) {
        const userId = Math.random() * Number.MAX_SAFE_INTEGER;
        const pwHash = auth.getPasswordHash(userId, password);

        const r = await db.queryProm(`INSERT INTO users (userId, email, name, phone, hashedPassword, createdTs)
            VALUES (?, ?, ?, ?, ?, ?)`, [ userId, email, name, phone, pwHash, Date.now() ]);

        if (result instanceof Error) {
            if (result.message.match(/Duplicate entry '.+' for key 'PRIMARY'/))
                continue;
            return res.status(500).send(result.error);
        }
        break;
    }

    
    return res.send("success");

};