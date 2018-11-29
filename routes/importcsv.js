var express = require('express');
var csvimport = express.Router();
var employee = require("../controllers/EmployeeController.js");

csvimport.get('/', function (req, res, next) {
	
    employee.importshow(req, res);
});

csvimport.post('/save', function (req, res, next) {
	console.log("import Save triggered");
    employee.import(req, res);
});

module.exports = csvimport;
