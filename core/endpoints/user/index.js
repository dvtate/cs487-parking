const router = require("express").Router();

router.post("/create", require("./create"));
router.post("/signin", require("./signin"));
router.get("/plates", require("./plates").list);
router.post("/plates/add", require("./plates").add);
module.exports = router;

