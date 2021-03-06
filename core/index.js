const debug = require("debug")("core:server");

const globals = require("./globals");

// connect to database
const db = require("./db");
db.begin()


// 
const express = require("express");
const app = express();

// parse body for POST requests
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// api endpoints
app.use("/api", require("./endpoints"));

// app hosting
app.use("/app", express.static("./app", { fallthrough: true }));
app.get("/app", (req, res) => res.redirect("/app/landing.html"));

if (require.main == module) 
    app.listen(globals.port, () => 
        debug("Server listening on port %d", globals.port));
