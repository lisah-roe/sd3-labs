// Get the functions in the db.js file to use
const db = require('../services/db');

class Module {
    // Module code
    code;
    // Module name
    name;

    constructor(code, name) {
        this.code = code;
        this.name = name;
    }

    async getModuleName() {
        if (typeof this.name !== 'string') {
            var sql = "SELECT * from Modules where code = ?"
            const results = await db.query(sql, [this.id]);
            this.name = results[0].name;
        }
    }
}

module.exports = {
    Module
}