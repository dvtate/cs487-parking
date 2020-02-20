const router = require("express").Router();

router.get("/:parkingLotId", require("./describe").lot);
router.get("/spots/:parkingLotId", require("./describe").spots);

module.exports = router;