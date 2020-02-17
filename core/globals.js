const debug = require("debug")("core:globals");

const config = {
    default: {
        pw_salt: "sndjank4j$NJKNJnnenj3j334$jtnqk",
    },
    
    development: {
        // listening port
        port: 5050,
        db: {
            host: "localhost",
            user: "root",
            password: "password",
            database: "makerbounty",
        },
        ro_db: {
            host: "localhost",
            user: "root",
            password: "password",
            database: "makerbounty",
        }
    },
    
    production: {
        // listening port
        port: 5050,
        // todo, use production database..
        db: {
            host: "localhost",
            user: "root",
            password: "strattyx",
            database: "cs487",
        },
        ro_db: {
            host: "localhost",
            user: "root",
            password: "strattyx",
            database: "cs487",
        }
    }
};


const env = process.env.NODE_ENV;
if (!config[env]) {
    debug("Invalid/Missing environment configuration '%s'", env);
    debug("Possible values for NODE_ENV are: %s", Object.keys(config).join(','));
    process.exit(1);
}


module.exports = Object.assign(config.default, config[env]);
module.exports.env = env;