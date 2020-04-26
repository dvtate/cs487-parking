const db = require("../../db");
const auth = require("../../auth");
const debug = require("debug")("core:endpoints:user:plates");

// post /user/plates/add
/*
{ "identifier": "G34 234F" }
*/
async function add(req, res) {
    const user = await auth.authUserSafe(req.get("Authorization"));
    if (user.error)
        return res.status(401).send(user.error);
    
    if (!req.body.identifier)
        return res.status(400).send("misssing plate identifier");

    const r = await db.queryProm(`INSERT INTO userLicensePlates (userId, identifier, addedTs)
        VALUES (?,?,?)`, [ user.userId, req.body.identifier, Date.now(), ], false);
    
    res.send("done");
}


// get /user/plates
async function list(req, res) {
    const user = await auth.authUserSafe(req.get("Authorization"));
    if (user.error)
        return res.status(401).send(user.error);
    
    const plates = await db.queryProm(`SELECT * FROM userLicensePlates WHERE userId=?`, 
        [ user.userId ], true);

    res.send(plates || []);
}

// DELETE /user/plate/:identifier
async function remove(req, res) {
    const user = await auth.authUserSafe(req.get("Authorization"));
    if (user.error)
        return res.status(401).send(user.error);
    
    const identifier = decodeURIComponent(req.params.identifier);
    const rm = await db.queryProm(`DELETE FROM userLicensePlates WHERE userId=? AND identifier=?`,
        [ user.userId, identifier ], false);
    
    res.send('ok');
    debug(rm);
}

module.exports = {
    add, list, remove
};
