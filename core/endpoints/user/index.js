const router = require("express").Router();

// signin/signup
router.post("/create", require("./create"));
router.post("/signin", require("./signin"));

// licence plate management
router.get("/plates", require("./plates").list);
router.post("/plates/add", require("./plates").add);
router.delete("plate/:identifier", require("./plates").remove);

module.exports = router;

