// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');
app.use(express.urlencoded({ extended: true }))

// Set the sessions
var session = require('express-session');
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Get the models
const { Student } = require("./models/student");
const programmes = require("./models/programmes");
const { User } = require("./models/user");


// Create a route for root - /
app.get("/", function(req, res) {
    console.log(req.session);
    if (req.session.uid) {
		res.send('Welcome back, ' + req.session.uid + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

// Task 1 JSON formatted listing of students
app.get("/all-students", function(req, res) {
    var sql = 'select * from Students';
    // As we are not inside an async function we cannot use await
    // So we use .then syntax to ensure that we wait until the 
    // promise returned by the async function is resolved before we proceed
    db.query(sql).then(results => {
        console.log(results);
        res.json(results);
    });

});

// Task 2 display a formatted list of students
app.get("/all-students-formatted", function(req, res) {
    var sql = 'select * from Students';
    // As we are not inside an async function we cannot use await
    // So we use .then syntax to ensure that we wait until the 
    // promise returned by the async function is resolved before we proceed
    db.query(sql).then(results => {
        res.render('all-students', {data:results});
    });
});

// Task 3 single student page
app.get("/single-student/:id", function (req, res) {
    var stId = req.params.id;
    // Create a student class with the ID passed
    var student = new Student(stId);
    student.getStudentDetails().then(
        Promise => {
            student.getStudentProgramme().then(Promise => {
                student.getStudentModules().then(Promise => {
                    programmes.getAllProgrammes().then(resultProgs => {
                        res.render('student', { 'student': student, 'programmes': resultProgs });
                    });
                });
            });
        });
});

// A post route to recieve new data for a students' programme
app.post('/allocate-programme', function (req, res) {
    params = req.body;
    var student = new Student(params.id)
    // Adding a try/catch block which will be useful later when we add to the database
    try {
        student.updateStudentProgramme(params.programme).then(result => {
            res.redirect('/single-student/' + params.id);
        })
     } catch (err) {
         console.error(`Error while adding programme `, err.message);
     }
});

app.post('/add-note', function (req, res) {
    params = req.body;
    var student = new Student(params.id)
    // Adding a try/catch block which will be useful later when we add to the database
    try {
        student.addStudentNote(params.note).then(result => {
            res.redirect('/single-student/' + params.id);
        })
     } catch (err) {
         console.error(`Error while adding note `, err.message);
     }
});

// Register
app.get('/register', function (req, res) {
    params = req.body;
    res.render('register');   
});

app.post('/set-password', function (req, res) {
    params = req.body;
    var user = new User(params.email);
    try {
        user.getIdFromEmail().then( uId => {
            if(uId) {
                 // If a valid, existing user is found, set the password and redirect to the users single-student page
                user.setUserPassword(params.password).then ( result => {
                    res.redirect('/single-student/' + uId);
                });
            }
            else {
                // If no existing user is found, add a new one
                user.addUser(params.email).then( Promise => {
                    res.send('Perhaps a page where a new user sets a programme would be good here');
                });
            }
        })
     } catch (err) {
         console.error(`Error while adding password `, err.message);
     }
});

// Login Form
app.get('/login', function (req, res) {
    res.render('login');
});


// Check submitted email and password pair
app.post('/authenticate', function (req, res) {
    params = req.body;
    var user = new User(params.email);
    try {
        user.getIdFromEmail().then(uId => {
            if (uId) {
                user.authenticate(params.password).then(match => {
                    if (match) {
                        req.session.uid = uId;
                        req.session.loggedIn = true;
                        console.log(req.session);
                        res.redirect('/single-student/' + uId);
                    }
                    else {
                        // TODO improve the user journey here
                        res.send('invalid password');
                    }
                });
            }
            else {
                res.send('invalid email');
            }
        })
    } catch (err) {
        console.error(`Error while comparing `, err.message);
    }
});

// Logout
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
  });



//Independent task 1: JSON output of all programmes
app.get("/all-programmes", function(req, res) {
    var sql = 'select * from Programmes';
    // As we are not inside an async function we cannot use await
    // So we use .then syntax to ensure that we wait until the 
    // promise returned by the async function is resolved before we proceed
    db.query(sql).then(results => {
        console.log(results);
        res.json(results);
    });

});

// Independent task 2 display a formatted list of programmes with each linked by ID
app.get("/programmes", function(req, res) {
    var sql = 'select * from Programmes';
    var output = '<table border="1px">';
    db.query(sql).then(results => {
        for (var row of results) {
            output += '<tr>';
            output += '<td>' + row.id + '</td>';
            output += '<td>' + '<a href="./single-programme/' + row.id + '">' + row.name + '</a>' + '</td>';
            output += '</tr>'
        }
        output+= '</table>';
        res.send(output);
    });
});


// Task 3 single programme page
app.get("/single-programme/:id", function (req, res) {
    var pCode = req.params.id;
    output = '';
    output += "<h1>Programme</h1>";
    //Get the programme title
    var pSql = "SELECT * FROM Programmes WHERE id = ?";
    db.query(pSql, [pCode]). then(results => {
        output += results[0].name;
    });
    //Now call the database for the modules
    //Why do you think that the word modules is coming in before the name of the programme??
    var modSql = "SELECT * FROM Programme_Modules pm \
    JOIN Modules m on m.code = pm.module \
    WHERE programme = ?";
    output += "<h2>Modules</h2>";
    db.query(modSql, [pCode]).then(results => {
        output += '<table border="1px">';
        for (var row of results) {
            output += '<tr>';
            output += '<td><a href="/single-module/' + row.code + '">' + row.module + '</a></td>';
            output += '<td>' + row.name + '</td>';
            output += '</tr>'
        }
        output+= '</table>';
        res.send(output);     
    });

});

// Task 6 single module page with programme and students for the module
app.get("/single-module/:id", function (req, res) {
    var mCode = req.params.id;
    output = '';
    output += "<h1>Module</h1>";
    //Get the module title
    var pSql = "SELECT * FROM Modules WHERE code = ?";
    db.query(pSql, [mCode]). then(results => {
        output += results[0].name;
    });
    //Now call the database for the programmes that have this module
    var pSql = "SELECT * FROM `Programme_Modules` pm \
    JOIN Programmes p ON p.id = pm.programme\
    WHERE module = ?";
    output += "<h2>Programmes with this module</h2>";
    var programmes = [];
    db.query(pSql, [mCode]).then(results => {
        output += '<table border="1px">';
        for (var row of results) {
            programmes.push(row.programme);
            output += '<tr>';
            output += '<td><a href="/single-programme/' + row.programme + '">' + row.name + '</a></td>';
            output += '<td>' + row.name + '</td>';
            output += '</tr>'
        }
        output += '</table>';

        // Now the students
        // Now call the database for the students in the module for each programme as there is a problem with the IN query

        // Generate placeholders - shouldnt be necessary!
        var placeholders = '';
        for (var prog of programmes) {
            placeholders += '?,'
        }
        placeholder = placeholders.replace(/,\s*$/, "");

        var sSql = "SELECT * FROM `Student_Programme` sp JOIN `Students` s on s.id = sp.id WHERE `programme` IN (" + placeholder + ")";
        output += "<h2>Students on this module</h2>";
        db.query(sSql, programmes).then(results => {
            output += '<table border="1px">';
            for (var row of results) {
                output += '<tr>';
                output += '<td><a href="/single-student/' + row.id + '">' + row.name + '</a></td>';
                output += '<td>' + row.programme + '</td>';
                output += '</tr>'
            }
            output += '</table>';
            res.send(output);

        });

    });

});

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    var sql = 'select * from test_table';
    // As we are not inside an async function we cannot use await
    // So we use .then syntax to ensure that we wait until the 
    // promise returned by the async function is resolved before we proceed
    db.query(sql).then(results => {
        console.log(results);
        res.json(results)
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});