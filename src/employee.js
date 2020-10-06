const { Client } = require('pg');

function createEmployee(name, user_name, callback) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect();
    const query = 'INSERT INTO "Employee" ("employee_name", "lat", "lng", "user_name") VALUES (\'' + name + '\', \'lat\',\'lng\',\'' + user_name + '\');';
    client.query(query, function(err, res) {
        callback(err, res);
        client.end();
    });
}

function setEmployeeLocation(name, lat, lng, user_name, callback) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect();
    const query = 'UPDATE "Employee" SET "lat"=\'' + lat + '\', "lng"=\'' + lng + '\' WHERE "employee_name"=\'' + name + '\' AND "user_name"=\'' + user_name + '\';';
    client.query(query, function(err, res) {
        callback(err, res);
        client.end();
    });
}

function getLocations(callback) {
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

module.exports = { 
    createEmployee,
    setEmployeeLocation,
    getLocations
};