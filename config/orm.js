var connection = require("../config/connection.js")


var orm = {
    all: function (tableInput, cb) {

        connection.query("SELECT * FROM ?", tableInput, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function (table, col, vals, cb) {
        connection.query("INSERT INTO ?? (??) VALUES (?)", [table, col, vals], function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    update: function (table, objColVals, condition, cb) {
        connection.query("UPDATE ?? SET ?? WHERE ?", [table, objColVals, condition], function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query("DELETE FROM ?? WHERE ?", [table, condition], function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm