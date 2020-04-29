const db = require("../../db");
const debug = require("debug")("core:endpoints:lots:list");

module.exports = async (req, res) => {
    const lots = await db.queryProm("SELECT * FROM parkingLots;", [], true);
	debug(lots);
    if (lots instanceof Error)
        return res.status(500).send(lots);
    res.json(lots);

};
