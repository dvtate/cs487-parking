const debug = require("debug")("core:user:create");
const db = require("../../db");
const auth = require("../../auth");
const validator = require("validator");



// POST /api/user/edit
/*
{
    "name" : "new name" 
    || 
    "email" : "new email"
    ||
    ""
}
*/
module.exports = async (req, res) => {
    const user = await auth.authUserSafe(req.get("Authorization"));
    if (user.error)
        return res.status(401).send(user.error);

};