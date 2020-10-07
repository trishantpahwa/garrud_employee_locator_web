const express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const fs = require('fs');

const { createEmployee } = require('./employee.js');
const { setEmployeeLocation } = require('./employee.js');
const { getLocations } = require('./employee.js');
const { getEmployees } = require('./employee.js');


const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/pretty-details', function(req, res) {
	const locations = fs.readFileSync('static/locations.html').toString();
	res.send(locations);
});

app.get('/details/:password', function (req, res) {
	const password = req.params.password;
	getLocations(password, function(err, result) {
		if(err) {
			console.log(err);
		}
		var locations = result.rows;
		locations.forEach(function(result) {
			delete result.location_id;
		})
		res.json({'Locations': result.rows});
	});
});

// Create employee
app.get('/:name/:password', function(req, res) {
	const name = req.params.name;
	const password = req.params.password;
	createEmployee(name, password, function(err, result) {
		if(err) {
			console.log(err);
			console.log(result);
		}
		else {
			res.json({name: 'Successfully created.'})
		}
	});
});

// Update employee location
app.post('/:password', function(req, res) {
	const lat = req.body.lat;
	const lng = req.body.lng;
	const password = req.params.password;
	setEmployeeLocation(lat, lng, password, function(err, result) {
		if(err) {
			console.log(err);
			console.log(result);
		} else {
			res.json({'Location': 'Updated'});
		}
	});
});

app.get('/employees', function(req, res) {
	getEmployees(function(err, result) {
		if(err) {
			console.log(err);
			console.log(result);
		} else {
			const employees = result.rows;
			res.json({'Employees': employees});
		}
	})
});

app.delete('/employee/:password', function(req, res) {
	const password = req.params.password;
	deleteEmployee(password, function(err, result) {
		if(err) {
			console.log(err);
			console.log(result);
			res.json({'User deleted': 'false'});
		} else {
			console.log(result);
			res.json({'User deleted': 'true'});
		}
	})
})

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});