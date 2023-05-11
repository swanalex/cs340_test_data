--AIRPORTS CREATE
--query for adding new airport functionality, with colon : being used to denote
    --the variables that will have data from the backend programming language
INSERT INTO 
    Airports (city, state, country, name, code)
VALUES
    (:cityInput, :stateInput, :countryInput, :nameInput, :codeInput);


--AIRPORTS READ
--query for reading all airports currently in database
SELECT * FROM Airports;


--AIRPORTS UPDATE
--your query here..


--AIRPORTS DELETE
--query to delete an airport from the database
DELETE FROM Airports WHERE Airports.airportID = :airport_ID_selected_from_browse_airports_page




--CREDIT CARDS CREATE
--get all passenger IDs with corresponding names to populate the passengerID dropdown
SELECT passengerID, firstName, lastName FROM Passengers;

--query for adding credit card of existing passenger functionality, with colon :
    --being used to denote the variables that will have data from the backend programming language
INSERT INTO 
    CreditCards (passengerID, number, expiration, securityCode)
VALUES 
    (:passengerID_from_dropdown_Input, :numberInput, :expirationInput, :securityCodeInput);


--CREDIT CARDS READ
--query for reading all credit cards (and passengers they belong to) currently in database
SELECT 
    Passengers.firstName, Passengers.lastName,
    CreditCards.number, CreditCards.expiration, CreditCards.securityCode
FROM CreditCards
JOIN Passengers ON CreditCards.passengerID = Passengers.passengerID;


--CREDIT CARDS UPDATE
--your query here..


--CREDIT CARDS DELETE
--query to delete a credit card from the database
DELETE FROM CreditCards WHERE CreditCards.creditCardID = :creditCard_ID_selected_from_browse_credit_cards_page




--FLIGHTS CREATE
--get all airport IDs with corresponding codes(names are too long) to populate the originAirportID dropdown
SELECT airportID, code FROM Airports;
--get all airport IDs with corresponding codes(names are too long) to populate the destinationAirportID dropdown
SELECT airportID, code FROM Airports;

--query for adding new flights fucntionality, with colon : being used to denote
    --the variables that will have data from the backend programming language
INSERT INTO 
    Flights (originAirportID, destinationAirportID, airline, duration, 
    numberOfSeats, date, departureTime, arrivalTime)
VALUES 
    (:airport_id_from__dropdown_Input, :airport_id_from_dropdown_Input, :airlineInput, 
    :durationInput, :numberOfSeatsInput, :dateInput, :departureTimeInput, :arrivalTimeInput);


--FLIGHTS READ
--query for reading/displaying all flights (with origins & destinations) currently in database--
    --**optional : finding flights from ___ airport using WHERE clause--
SELECT 
    A1.code AS origin_airport,
    A2.code AS destination_airport,
    F.airline, F.date, F.departureTime, F.arrivalTime
FROM 
    Flights AS F
    JOIN Airports AS A1 ON F.originAirportID = A1.airportID
    JOIN Airports AS A2 ON F.destinationAirportID = A2.airportID;
--WHERE
    --A1.code = 'LAX';


--FLIGHTS UPDATE
--your query here..


--FLIGHTS DELETE
--query to delete a flight from the database
DELETE FROM Flights WHERE Flights.flighID = :flights_ID_selected_from_browse_flights_page




--PASSENGERS CREATE
--query for adding new passengers functionality, with colon : being used to denote
    --the variables that will have data from the backend programming language

INSERT INTO 
    Passengers (firstName, lastName, streetAddress, city, state, country)
VALUES
    (:firstNameInput, :lastNameInput, :streetAddressInput, :cityInput, :stateInput, :countryInput);


--PASSENGERS READ
--query for reading all passenger info currently in database
SELECT * FROM Passengers;


--PASSENGERS UPDATE
--your query here..


--PASSENGERS DELETE
--query to delete a passenger from the database
DELETE FROM Passengers WHERE Passengers.passengerID = :passengers_ID_selected_from_browse_passengers_page




--TICKETS CREATE
--get all passenger IDs with corresponding names to populate the passengerID dropdown
SELECT passengerID, firstName, lastName FROM Passengers;
--get all origins/destinations(codes) and corresponding flight IDs to populate the flightID dropdown
SELECT 
    A1.code AS origin_airport,
    A2.code AS destination_airport,
    F.flightID
FROM 
    Flights AS F
    JOIN Airports AS A1 ON F.originAirportID = A1.airportID
    JOIN Airports AS A2 ON F.destinationAirportID = A2.airportID;

--query for adding new tickets (for an existing passenger) functionality, with colon :
    --being used to denote the variables that will have data from the backend programming language
INSERT INTO 
    Tickets (passengerID, flightID, price, seatNumber)
VALUES
    (:passenger_id_from_dropdown_Input, :flight_id_from_dropdown_Input, :priceInput, :seatNumberInput);


--TICKETS READ
--query for reading all tickets currently purchased (and who purchased them) in the database
SELECT 
    Passengers.firstName, Passengers.lastName, 
    Tickets.price, Tickets.seatNumber
FROM Tickets
JOIN Passengers ON Tickets.passengerID = Passengers.passengerID;


--TICKETS UPDATE
--your query here..


--TICKETS DELETE
--query to delete a ticket from the database
DELETE FROM Tickets WHERE Tickets.ticketID = :ticket_ID_selected_from_browse_tickets_page