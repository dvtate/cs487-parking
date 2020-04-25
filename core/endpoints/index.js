const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/lots", require("./lots"));
router.use("/reservation", require("./reservation"));

module.exports = router;
