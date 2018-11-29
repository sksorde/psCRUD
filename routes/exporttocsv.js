var express = require('express');
var csvexport = express.Router();
var employee = require("../controllers/EmployeeController.js");

csvexport.get('/', function (req, res, next) {
	console.log("export triggered");
    employee.export(req, res);
});


module.exports = csvexport;
