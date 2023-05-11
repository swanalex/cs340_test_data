--query for adding new airport functionality, with colon : being used to denote
    --the variables that will have data from the backend programming language

INSERT INTO 
    Airports (city, state, country, name, code)
VALUES
    (:cityInput, :stateInput, :countryInput, :nameInput, :codeInput);


--query for reading all airports currently in database

SELECT * FROM Airports;




--query for adding credit card of existing passenger functionality, with colon :
    --being used to denote the variables that will have data from the backend programming language

INSERT INTO 
    CreditCards (passengerID, number, expiration, securityCode)
VALUES 
    (:passengerID_from_dropdown_Input, :numberInput, :expirationInput, :securityCodeInput);


--query for reading all credit cards (and passengers they belong to) currently in database

SELECT 
    Passengers.firstName, Passengers.lastName,
    CreditCards.number, CreditCards.expiration, CreditCards.securityCode
FROM CreditCards
JOIN Passengers ON CreditCards.passengerID = Passengers.passengerID;




--query for adding new flights fucntionality, with colon : being used to denote
    --the variables that will have data from the backend programming language

INSERT INTO 
    Flights (originAirportID, destinationAirportID, airline, duration, 
    numberOfSeats, date, departureTime, arrivalTime)
VALUES 
    (:airport_id_from__dropdown_Input, :airport_id_from_dropdown_Input, :airlineInput, 
    :durationInput, :numberOfSeatsInput, :dateInput, :departureTimeInput, :arrivalTimeInput);


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




--query for adding new passengers functionality, with colon : being used to denote
    --the variables that will have data from the backend programming language

INSERT INTO 
    Passengers (firstName, lastName, streetAddress, city, state, country)
VALUES
    (:firstNameInput, :lastNameInput, :streetAddressInput, :cityInput, :stateInput, :countryInput);


--query for reading all passenger info currently in database

SELECT * FROM Passengers;




--query for adding new tickets (for an existing passenger) functionality, with colon :
    --being used to denote the variables that will have data from the backend programming language

INSERT INTO 
    Tickets (passengerID, flightID, price, seatNumber)
VALUES
    (:passenger_id_from_dropdown_Input, :flight_id_from_dropdown_Input, :priceInput, :seatNumberInput);


--query for reading all tickets currently purchased (and who purchased them) in the database

SELECT 
    Passengers.firstName, Passengers.lastName, 
    Tickets.price, Tickets.seatNumber
FROM Tickets
JOIN Passengers ON Tickets.passengerID = Passengers.passengerID;