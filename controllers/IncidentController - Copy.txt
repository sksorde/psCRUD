var mongoose = require("mongoose");
var Incident = require("../models/Incident");


var incidentController = {};

console.log("inside controller");

// Show list of employees
incidentController.list = function (req, res) {
    Incident.find({}).exec(function (err, incidents) {
        if (err) {
            console.log("Error:", err);
        }
        else {
		//console.log("inside list");
            res.render("../views/employees/index", { incidents: incidents });
        }
    });
};

incidentController.home = function (req, res) {
    Incident.find({}).exec(function (err, incidents) {
        if (err) {
            console.log("Error:", err);
        }
        else {
		console.log("inside home");
            res.render("../views/employees/TTTPage", { "": "" });
        }
    });
};

// Show employee by id
incidentController.show = function (req, res) {
    Incident.findOne({ _id: req.params.id }).exec(function (err, incident) {
        if (err) {
            console.log("Error:", err);
        }
        else {
		//console.log("inside list");
            res.render("../views/employees/show", { incident: incident });
        }
    });
};

// Create new employee
incidentController.create = function (req, res) {
		//console.log("inside list");
    res.render("../views/employees/create");
};

// Save new employee
incidentController.save = function (req, res) {
    var incident = new Incident(req.body);

    Incident.save(function (err) {
        if (err) {
            console.log(err);
	    console.log("Error during save");
            res.render("../views/employees/create");
        } else {
            console.log("Successfully created an incident.");
            res.redirect("/employees/show/" + incident._id);
        }
    });
};

// Edit an employee
incidentController.edit = function (req, res) {
    Incident.findOne({ _id: req.params.id }).exec(function (err, incident) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/employees/edit", { incident: incident });
        }
    });
};

// Update an employee
incidentController.update = function (req, res) {
    Incident.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary } }, { new: true }, function (err, incident) {
        if (err) {
            console.log(err);
            res.render("../views/employees/edit", { employee: req.body });
        }
        res.redirect("/employees/show/" + incident._id);
    });
};

// Delete an employee
incidentController.delete = function (req, res) {
    Incident.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employee deleted!");
            res.redirect("/employees");
        }
    });
};

module.exports = incidentController;
