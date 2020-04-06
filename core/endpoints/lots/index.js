const router = require("express").Router();

router.get("/:parkingLotId", require("./describe").lot);
router.get("/spots/:parkingLotId", require("./describe").spots);
router.get("/", require("./list"));

module.exports = router;