const express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

const route = require('./Routes/index.js');

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:name', function(req, res) {
	const name = req.params.name;
	createEmployee(name, function(err, result) {
		if(err) {
			console.log(err);
		}
		console.log(result);
		res.json({'Hello': 'Hello'});
	});
});

app.post('/:name', function(req, res) {
	const name = req.params.name;
	const lat = req.body.lat;
	const lng = req.body.lng;
	setEmployeeLocation(name, lat, lng, function(err, result) {
		if(err) {
			console.log(err);
		}
		console.log(result);
		res.json({'Hello': 'Hello'});
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});