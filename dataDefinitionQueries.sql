--recommended from Project Step 2 specs page--
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- [your SQL goes here]

--Create Passengers table--
CREATE OR REPLACE TABLE Passengers (
    passengerID int NOT NULL AUTO_INCREMENT,
    firstName varchar(50),
    lastName varchar(50),
    streetAddress varchar(50),
    city text(50),
    state text(50),
    country text(50),
    PRIMARY KEY (passengerID)
);


--Add data into Passengers table--


--Create CreditCards table--
CREATE OR REPLACE TABLE CreditCards (
    creditCardID int NOT NULL AUTO_INCREMENT,
    passengerID int NOT NULL,
    number int NOT NULL,
    expiration int NOT NULL,
    securityCode int NOT NULL,
    PRIMARY KEY (creditCardID),
    FOREIGN KEY (passengerID) REFERENCES Passengers(passengerID)
);

--Add data into CreditCards table--


--Create Airports table--
CREATE OR REPLACE TABLE Airports (
    airportID int NOT NULL AUTO_INCREMENT,
    city text(50) NOT NULL,
    state text(50),
    country text(50) NOT NULL,
    name varchar(50),
    code varchar(50),
    PRIMARY KEY (airportID)
);


--Add data into Airports table--









SET FOREIGN_KEY_CHECKS = 1;
COMMIT;