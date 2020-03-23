const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/lot", require("./lots"));
router.use("/reservation", require("./reservation"));

module.exports = router;
