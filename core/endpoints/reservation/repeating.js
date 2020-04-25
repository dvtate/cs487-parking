const db = require("../../db");

// POST /reservation/repeating
module.exports = async (req, res) => {
    // user must be logged in to make reservation
    const user = await auth.authUserSafe(req.get("Authorization"));
    if (user.error)
        return res.status(401).send(user.error);
    const userId = user.userId;

    const { parkingLotId } = req.body;
    if (!parkingLotId)
        return res.status(400).send("missing parking lot");

    const [ spot ] = await db.queryProm(` SELECT * FROM parkingSpots 
        WHERE occupied=0 AND parkingLotId=?
            AND parkingSpotId NOT IN (
                SELECT parkingSpotId FROM oneTimeReservations
            AND parkingSpotId NOT IN (
                SELECT parkingSpotId FROM repeatReservations
            )
        LIMIT 1;
    `, [ parkingLotId ], true);

    if (!spot)
        return res.status(463).send("lot full");

    for (; ;) {
        const id = Math.random() * Number.MAX_SAFE_INTEGER;

        const q = await db.queryProm(`INSERT INTO subscriptions 
        (subscriptionId, parkingSpotId, userId) VALUES (?,?,?);`, [
            id, spot.parkingSpotId, userId
        ], false);

        if (q instanceof Error) {
            if (q.message.match(/Duplicate entry '.+' for key 'PRIMARY'/))
                continue;
            return res.status(500).send(result.error);
        }

        // 
        return res.json({
            spot, 
            id
        });
    }

};