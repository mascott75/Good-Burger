var connection = require("../config/connection.js")
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
}

var orm = {
    all: function (tableInput, cb) {

        connection.query("SELECT * FROM ??", tableInput, function (err, result) {
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
        connection.query("UPDATE ?? SET ?? WHERE ?", [table, objToSql(objColVals), condition], function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: function (table, condition, cb) {
        connection.query("DELETE FROM ?? WHERE ?", [table, condition], function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;