const router = require("express").Router();

router.post("/onetime", require("./one_time"));
router.post("/repeating", require("./repeating"));

module.exports = router;
