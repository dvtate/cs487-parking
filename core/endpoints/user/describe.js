const debug = require("debug")("core:user:describe");
const db = require("../../db");
const auth = require("../../auth");

module.exports = async (req, res) => {
    // user must be logged in to make reservation
    const user = await auth.authUserSafe(req.get("Authorization"));
    if (user.error)
        return res.status(401).send(user.error);
    const userId = user.userId;

    try {
        const [ud] = await db.queryProm("SELECT * FROM users WHERE userId=?", [userId, ], true);
        debug(ud);
        res.json (ud);
    } catch (e) {
        debug(e);
        res.error(e);
    }
}