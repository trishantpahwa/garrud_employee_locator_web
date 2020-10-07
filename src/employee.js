const { Client } = require('pg');

function createEmployee(name, user_name, callback) {
    var client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect();
    const insert_query = 'INSERT INTO "Employee" ("employee_name", "user_name") VALUES (\'' + name + '\',\'' + user_name + '\');';
    client.query(insert_query, function(err, result) {
        if(err) {
            callback(err, result);
        } else {
            const create_query = 'CREATE TABLE "' + user_name + '"("locaiton_id" SERIAL NOT NULL PRIMARY KEY, "lat" character varying NOT NULL, "lng" character varying NOT NULL, "time" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP);';
            client.query(create_query, function(err, result) {
                callback(err, result);
                client.end();
            });
        }
    });
}

function setEmployeeLocation(lat, lng, user_name, callback) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect();
    const query = 'INSERT INTO "' + user_name + '" ("lat", "lng") VALUES (\'' + lat + '\',\'' + lng + '\');'
    console.log(query);
    client.query(query, function(err, res) {
        callback(err, res);
        client.end();
    });
}

function getLocations(user_name, callback) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect();
    const query = 'SELECT * FROM "' + user_name + '";';
    client.query(query, function(err, res) {
        callback(err, res);
        client.end();
    });
}

function getEmployees(callback) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect();
    const query = 'SELECT * FROM "Employee";';
    client.query(query, function(err, res) {
        callback(err, res);
        client.end();
    });
}

function deleteEmployee(username, callback) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect();
    const query = 'SELECT * FROM "Employee";';
    cosnole.log(query);
    // client.query(query, function(err, res) {
    //     callback(err, res);
    //     client.end();
    // });
}

module.exports = { 
    createEmployee,
    setEmployeeLocation,
    getLocations,
    getEmployees,
    deleteEmployee
};