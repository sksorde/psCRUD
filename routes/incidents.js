var express = require('express');
var router = express.Router();
var incident = require("../controllers/IncidentController.js");
console.log("inside incidents.js");

// Get all incidents
router.get('/', function (req, res) {
    incident.list(req, res);
});

// Get single incident by id
router.get('/show/:id', function (req, res) {
    incident.show(req, res);
});

// Create incident
router.get('/create', function (req, res) {
    incident.create(req, res);
});

// Save incident
router.post('/save', function (req, res) {
	console.log("save methoed triggered");
    incident.save(req, res);
});

// Edit incident
router.get('/edit/:id', function (req, res) {
    incident.edit(req, res);
});

// Edit update
router.post('/update/:id', function (req, res) {
    incident.update(req, res);
});

// Edit update
router.post('/delete/:id', function (req, res, next) {
    incident.delete(req, res);
});

module.exports = router;
