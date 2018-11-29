var mongoose = require("mongoose");
var Employee = require("../models/Employee");
var csv      = require('csv-express');		// Adde by Parag for Export functionality
var csvimport = require('fast-csv');	// Added by Parag for Import functionality

var employeeController = {};

console.log("inside controller");

// To export the Incidents - added by Parag Shah

employeeController.export = function (req, res) {
    
    var filename   = "incident.csv";
    var dataArray;

    Employee.find({}).lean().exec(function (err, employees) {
        if (err) {
            console.log("Error:", err);
        }
        else {
		console.log(employees);
		res.setHeader('Content-Type', 'text/csv');
	        res.setHeader("Content-Disposition", "filename=" + filename);
	        res.csv(employees, true);

        }
    });
};


// To redirect import page

employeeController.importshow = function (req, res) {
    
	res.render('../views/employees/import');
	
};

// To upload and save imported incidents

employeeController.import = function (req, res) {
    
	if (!req.files) {

	       	 return res.status(400).send('No files were uploaded.');
	}
     
	var incidentFile = req.files.file;
	var incidents = [];
	csvimport
     		.fromString(incidentFile.data.toString(), {
         		headers: true,
	         	ignoreEmpty: false
     		})
		.on("data", function(data){
       			  data['_id'] = new mongoose.Types.ObjectId();
          
         		incidents.push(data);
		 })
		.on("end", function(){
		         Employee.create(incidents, function(err, employee) {
		         if (err) throw err;
	         });
		//res.send(incidents.length + ' incidents have been successfully uploaded.');
		Employee.find({}).exec(function (err, employees) {
        		if (err) {
            			console.log("Error:", err);
        		}
       			 else {
		
            			res.render("../views/employees/index", { employees: employees });
       			 }
   		 });
	});
};




// Show list of employees
employeeController.list = function (req, res) {
    Employee.find({}).exec(function (err, employees) {
        if (err) {
            console.log("Error:", err);
        }
        else {
		
            res.render("../views/employees/index", { employees: employees });
        }
    });
};

employeeController.home = function (req, res) {
    Employee.find({}).exec(function (err, employees) {
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
employeeController.show = function (req, res) {
    Employee.findOne({ _id: req.params.id }).exec(function (err, employee) {
        if (err) {
            console.log("Error:", err);
        }
        else {

            res.render("../views/employees/show", { employee: employee });
        }
    });
};

// Create new employee
employeeController.create = function (req, res) {

    res.render("../views/employees/create");
};

// Save new employee
employeeController.save = function (req, res) {
    var employee = new Employee(req.body);

    employee.save(function (err) {
        if (err) {
            console.log(err);
            res.render("../views/employees/create");
        } else {
            console.log("Successfully created an employee."+ employee);
            res.redirect("/employees/show/" + employee._id);
        }
    });
};

// Edit an employee
employeeController.edit = function (req, res) {
    Employee.findOne({ _id: req.params.id }).exec(function (err, employee) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/employees/edit", { employee: employee });
        }
    });
};

// Update an employee
employeeController.update = function (req, res) {
    Employee.findByIdAndUpdate(req.params.id, { $set: { raisedby: req.body.raisedby, address: req.body.location, teamleader: req.body.teamleader, team: req.body.team ,otherupdates: req.body.otherupdates} }, { new: true }, function (err, employee) {
        if (err) {
            console.log(err);
            res.render("../views/employees/edit", { employee: req.body });
        }
	console.log('inside controller incident id is:'+ employee._id);
        res.redirect("/employees/show/" + employee._id);
    });
};

// Delete an employee
employeeController.delete = function (req, res) {
    Employee.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Employee deleted!");
            res.redirect("/employees");
        }
    });
};

module.exports = employeeController;
