


// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
PORT = 5467;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector')

// app.js

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/

/*
    GET routes - (R step (READ) of CRUD)
*/


// GET route for passengers
app.get('/', function (req, res) {
    let query1 = "SELECT * FROM Passengers;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('index', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

// GET route for Airports
app.get('/Airports.hbs', function (req, res) {
    let query1 = "SELECT * FROM Airports;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('Airports', { data: rows });                  // Render the Airports.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' 
});

// GET route for creditCards
app.get('/CreditCards.hbs', function (req, res) {
    let query1 = "SELECT * FROM CreditCards;";               // Define our query
    let query2 = "SELECT * FROM Passengers;";

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        let creditCards = rows;
        db.pool.query(query2, (error, rows, fields) => {
            let passengers = rows;

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let passengermap = {}
            passengers.map(passenger => {
                let id = parseInt(passenger.passengerID, 10);

                passengermap[id] = passenger["firstName"] + " " + passenger["lastName"];
            })

            // Overwrite the passengerID with the name of the passenger
            creditCards = creditCards.map(person => {
                return Object.assign(person, { passengerID: passengermap[person.passengerID] })
            })

            return res.render('CreditCards', { data: creditCards, passengers: passengers });
        })
    })
});

// GET route for flights
app.get('/Flights.hbs', function (req, res) {
    // we use a join here to be able to display the origin and destination of the flight
    let query1 = "SELECT Flights.flightID, A1.code AS originCode, A2.code AS destinationCode, Flights.airline, Flights.duration, Flights.numberOfSeats, Flights.date, Flights.departureTime, Flights.arrivalTime FROM Flights JOIN Airports AS A1 ON Flights.originAirportID = A1.airportID JOIN Airports AS A2 ON Flights.destinationAirportID = A2.airportID ORDER BY Flights.flightID;";
    let query2 = "SELECT * FROM Airports;";

    db.pool.query(query1, function (error, rows, fields) {          // execute the first query
        let flights = rows;
        db.pool.query(query2, function (error, rows, fields) {      // execute the second query
            let airports = rows;
            res.render('Flights', { data: flights, airports: airports })

        })                  
    })                                                      
});

// GET route for tickets
app.get('/Tickets.hbs', function (req, res) {
    // we use a join here to be able to display 'user-friendly' info in place of passengerID and flightID
    let query1 = "SELECT Tickets.ticketID, CONCAT(Passengers.firstName, ' ', Passengers.lastName) AS passengerFullName, CONCAT(A1.code, '-', A2.code) AS originDestination, Tickets.price, Tickets.seatNumber FROM Tickets JOIN Passengers ON Tickets.passengerID = Passengers.passengerID JOIN Flights ON Tickets.flightID = Flights.flightID JOIN Airports AS A1 ON Flights.originAirportID = A1.airportID JOIN Airports AS A2 ON Flights.destinationAirportID = A2.airportID ORDER BY Tickets.ticketID;";
    let query2 = "SELECT * FROM Passengers;";
    // we use another join here to display all the available flights in the database as 'user-friendly' info in the dropdown menus for adding/updating a flight
    let query3 = "SELECT CONCAT(a1.code, ' -> ', a2.code) AS originDestination, f.flightID FROM Flights f JOIN Airports a1 ON f.originAirportID = a1.airportID JOIN Airports a2 ON f.destinationAirportID = a2.airportID;"

    db.pool.query(query1, function (error, rows, fields) {              // execute first query
        let tickets = rows;
        db.pool.query(query2, function (error, rows, fields) {          // execute second query
            let passengers = rows;
            db.pool.query(query3, function (errors, rows, fields) {     // execute third query
                let flights = rows;
                res.render('Tickets', { data: tickets, passengers: passengers, flights: flights })
            })
        })                  
    })                                                      
});



/*
    POST routes - (C step (CREATE) of CRUD)
*/


// POST route for passengers
app.post('/add-passengers-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Passengers (firstName, lastName, streetAddress, city, state, country) VALUES ('${data['input-firstName']}', 
        '${data['input-lastName']}', '${data['input-streetAddress']}', '${data['input-city']}', '${data['input-state']}', 
        '${data['input-country']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Passengers and
        // present it on the screen
        else {
            res.redirect('/');
        }
    })
})

// POST route for airports
app.post('/add-airports-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Airports (city, state, country, name, code) VALUES ('${data['input-city']}', 
        '${data['input-state']}', '${data['input-country']}', '${data['input-name']}', '${data['input-code']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Airports and
        // present it on the screen
        else {
            res.redirect('/Airports.hbs');
        }
    })
})

// POST route for creditCards
app.post('/add-creditCards-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Block of code to enable a NULLable FK
    if (data['input-passengerID'] == '') {
        data['input-passengerID'] = 'NULL';
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO CreditCards (passengerID, number, expiration, securityCode) VALUES (${data['input-passengerID']}, 
        '${data['input-number']}', '${data['input-expiration']}', '${data['input-securityCode']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM credit cards and
        // presents it on the screen
        else {
            res.redirect('/CreditCards.hbs');
        }
    })
})

// POST route for flights
app.post('/add-flights-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Flights (originAirportID, destinationAirportID, airline, duration, numberOfSeats, date, departureTime, arrivalTime) VALUES ('${data['add-flights-origin']}', 
        '${data['add-flights-destination']}', '${data['add-flights-airline']}', '${data['add-flights-duration']}', '${data['add-flights-seatNumber']}', '${data['add-flights-date']}', '${data['add-flights-departureTime']}', '${data['add-flights-arrivalTime']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/Flights.hbs');
        }
    })
})

// POST route for tickets
app.post('/add-tickets-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Tickets (passengerID, flightID, price, seatNumber) VALUES ('${data['add-tickets-passengerID']}', 
        '${data['add-tickets-flightID']}', '${data['add-tickets-price']}', '${data['add-tickets-seatNumber']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/Tickets.hbs');
        }
    })
});



/*
    PUT routes - (U step (UPDATE) of CRUD)
*/


// PUT route for airports
app.put('/put-airports-ajax', function (req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Get each individual attribute from the request object
    let airportID = parseInt(data.airportID);
    let city = data.city;
    let state = data.state;
    let country = data.country;
    let name = data.name;
    let code = data.code;

    // Create the queries
    let queryUpdateAirport = `UPDATE Airports SET city = ?, state = ?, country = ?, name = ?, code = ? WHERE Airports.airportID = ?;`;
    let selectAirport = `SELECT * FROM Airports WHERE airportID = ?;`;

    // Run the 1st query
    db.pool.query(queryUpdateAirport, [city, state, country, name, code, airportID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the Airports
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectAirport, [airportID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

// PUT route for creditCards
app.put('/put-creditCards-ajax', function (req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Get each individual attribute from the request object
    let creditCardID = parseInt(data.creditCardID);
    let passengerID = parseInt(data.passengerID);
    let number = data.number;
    let expiration = data.expiration;
    let securityCode = data.securityCode;

    // If there is no passengerID, we set it to NULL
    if (isNaN(passengerID)) {
        passengerID = null;
    }

    // Create the queries
    let queryUpdateCreditCard = `UPDATE CreditCards SET passengerID = ?, number = ?, expiration = ?, securityCode = ? WHERE creditCardID = ?;`;
    let selectCreditCard = `SELECT * FROM CreditCards WHERE creditCardID = ?;`;

    // Run the first query
    db.pool.query(queryUpdateCreditCard, [passengerID, number, expiration, securityCode, creditCardID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the CreditCards
        // table on the front-end
        else {
            db.pool.query(selectCreditCard, [creditCardID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// PUT route for flights
app.put('/put-flights-ajax', function (req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Get each individual attribute from the request object
    let flightID = parseInt(data.flightID);
    let originAirportID = parseInt(data.originAirportID);
    let destinationAirportID = parseInt(data.destinationAirportID);
    let airline = data.airline;
    let duration = parseInt(data.duration);
    let numberOfSeats = parseInt(data.numberOfSeats);
    let date = data.date;
    let departureTime = data.departureTime;
    let arrivalTime = data.departureTime;

    // Crete the queries
    let queryUpdateTicket = `UPDATE Flights SET originAirportID = ?, destinationAirportID = ?, airline = ?, duration = ?, numberOfSeats = ?, date = ?, departureTime = ?, arrivalTime = ? WHERE Flights.flightID = ?;`;
    let selectTicket = `SELECT * FROM Flights WHERE flightID = ?;`;

    // Run the 1st query
    db.pool.query(queryUpdateTicket, [originAirportID, destinationAirportID, airline, duration, numberOfSeats, date, departureTime, arrivalTime, flightID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the Flights
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectTicket, [flightID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

// PUT route for passengers
app.put('/put-passengers-ajax', function (req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Get each individual attribute from the request object
    let passengerID = parseInt(data.passengerID);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let streetAddress = data.streetAddress;
    let city = data.city;
    let state = data.state;
    let country = data.country;

    // Create the queries
    let queryUpdatePassenger = `UPDATE Passengers SET firstName = ?, lastName = ?, streetAddress = ?, city = ?, state = ?, country = ? WHERE passengerID = ?;`;
    let selectPassenger = `SELECT * FROM Passengers WHERE passengerID = ?;`;

    // Run the first query
    db.pool.query(queryUpdatePassenger, [firstName, lastName, streetAddress, city, state, country, passengerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the Passengers
        // table on the front-end
        else {
            db.pool.query(selectPassenger, [passengerID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// PUT route for tickets
app.put('/put-tickets-ajax', function (req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Get each individual attribute from the request object
    let ticketID = parseInt(data.ticketID);
    let passengerID = parseInt(data.passengerID);
    let flightID = parseInt(data.flightID);
    let price = data.price;
    let seatNumber = data.seatNumber;

    // Create the queries
    let queryUpdateTicket = `UPDATE Tickets SET passengerID = ?, flightID = ?, price = ?, seatNumber = ? WHERE Tickets.ticketID = ?;`;
    let selectTicket = `SELECT * FROM Tickets WHERE ticketID = ?;`;

    // Run the 1st query
    db.pool.query(queryUpdateTicket, [passengerID, flightID, price, seatNumber, ticketID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the Tickets
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectTicket, [ticketID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});



/*
    DELETE routes - (D step (DELETE) of CRUD)
*/


// DELETE route for airports
app.delete('/delete-airports-ajax/', function (req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Get the airportID of the airport we're deleting
    let airportID = parseInt(data.id);

    // Create our query
    let deleteAirport = `DELETE FROM Airports WHERE airportID = ?`;


    // Run the 1st query
    db.pool.query(deleteAirport, [airportID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
        } else {
            // Send status 204 No Content which indicates a successful request but doesn't navigate away from the content
            res.sendStatus(204);
        }
    })
});

// DELETE route for creditCards
app.delete('/delete-creditCards-ajax/', function (req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Get the creditCardID of the credit card we're deleting
    let creditCardID = parseInt(data.id);

    // Create our query
    let deleteCreditCard = `DELETE FROM CreditCards WHERE creditCardID = ?`;


    // Run the 1st query
    db.pool.query(deleteCreditCard, [creditCardID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
        } else {
            // Send status 204 No Content which indicates a successful request but doesn't navigate away from the content
            res.sendStatus(204);
        }
    })
});

// DELETE route for flights
app.delete('/delete-flights-ajax/', function (req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Get the flightID of the flight we're deleting
    let flightID = parseInt(data.id);

    // Create our query
    let deleteFlight = `DELETE FROM Flights WHERE flightID = ?`;


    // Run the 1st query
    db.pool.query(deleteFlight, [flightID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
        } else {
            // Send status 204 No Content which indicates a successful request but doesn't navigate away from the content
            res.sendStatus(204);
        }
    })
});

// DELETE route for passengers
app.delete('/delete-passengers-ajax/', function (req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Get the passengerID of the passenger we're deleting
    let passengerID = parseInt(data.id);

    // Create our query
    let deletePassenger = `DELETE FROM Passengers WHERE passengerID = ?`;


    // Run the 1st query
    db.pool.query(deletePassenger, [passengerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
        } else {
            // Send status 204 No Content which indicates a successful request but doesn't navigate away from the content
            res.sendStatus(204);
        }
    })
});

// DELETE route for tickets
app.delete('/delete-tickets-ajax/', function (req, res, next) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Get the ticketID of the ticket we're deleting
    let ticketID = parseInt(data.id);

    // Create our query
    let deleteTicket = `DELETE FROM Tickets WHERE ticketID = ?`;


    // Run the 1st query
    db.pool.query(deleteTicket, [ticketID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
        } else {
            // Send status 204 No Content which indicates a successful request but doesn't navigate away from the content
            res.sendStatus(204);
        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});