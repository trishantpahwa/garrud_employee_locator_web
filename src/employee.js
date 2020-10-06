const { Client } = require('pg');

function createEmployee(name, callback) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect();
    const query = 'INSERT INTO ';
    client.query(query, function(err, res) {
        callback(err, res);
        client.end();
    });
}

function setEmployeeLocation(name, lat, lng, callback) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
    client.connect();
    const query = 'ALTER TABLE  ';
    client.query(query, function(err, res) {
        callback(err, res);
        client.end();
    });
}

module.exports = { 
    createEmployee,
    setEmployeeLocation
};