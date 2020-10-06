const express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

const { createEmployee } = require('./employee.js');
const { setEmployeeLocation } = require('./employee.js');
const { getLocations } = require('./employee.js');

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/:name/:password', function(req, res) {
	const name = req.params.name;
	const lat = req.body.lat;
	const lng = req.body.lng;
	const password = req.params.password;
	setEmployeeLocation(name, lat, lng, password, function(err, result) {
		if(err) {
			console.log(err);
			console.log(result);
		} else {
			res.json({'Location': 'Updated'});
		}
	});
});

app.get('/details', function (req, res) {
	getLocations(function(err, result) {
		if(err) {
			console.log(err);
		}
		var employees = result.rows;
		employees.forEach(function(employee) {
			delete employee.employee_id;
			delete employee.user_name;
			employee[ 'Live location']= 'https://www.google.com/maps/search/?api=1&query=' + employee.lat + ',' + employee.lng;
		});
		res.json({'Employees': employees});
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});