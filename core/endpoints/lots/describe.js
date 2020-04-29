const db = require("../../db");
const auth = require("../../auth");
const debug = require("debug")("core:endpoints:lots:spots");


// GET /lots/spots/:parkingLotId
module.exports.spots = async (req, res) => {

    const spots = await db.queryProm(`SELECT parkingSpotId, label, occupied 
        FROM parkingSpots WHERE parkingLotId = ?`, [ req.params.parkingLotId ], true);
    debug(spots);
    // 
    if (spots instanceof Error)
        return res.status(500).send(spots);
    if (!spots.length)
        return res.status(404).send("invalid parkingLotId");

    res.send(spots);

};

// GET /lots/:parkingLotId
module.exports.lot = async (req, res) => {
    // user must be logged in to make reservation
    const user = await auth.authUserSafe(req.get("Authorization"));
    if (user.error)
        return res.status(401).send(user.error);
    const userId = user.userId;

    const [ data ] = await db.queryProm(`SELECT name, address, areaCode, contactEmail, contactPhone 
        FROM parkingLots WHERE parkingLotId=?`, [ req.params.parkingLotId ], true);
    debug(data);
    //if ( instanceof Error)
    //    return res.status(500).send(spots);
    if (!data)
        return res.status(404).send("invalid parkingLotId");

    res.send(data);

};
