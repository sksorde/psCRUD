var express = require('express');
var home = express.Router();
var employee = require("../controllers/EmployeeController.js");
console.log("inside routes\home");

// Get all employees
home.get('/', function (req, res) {
    employee.home(req, res);
});



module.exports = home;
