--recommended from Project Step 2 specs page--
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- [your SQL goes here]

--Create Passengers table--
CREATE OR REPLACE TABLE Passengers (
    passengerID int NOT NULL AUTO_INCREMENT,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    streetAddress varchar(50),
    city text(50),
    state text(50),
    country text(50),
    PRIMARY KEY (passengerID)
);

--Create CreditCards table--
CREATE OR REPLACE TABLE CreditCards (
    creditCardID int NOT NULL AUTO_INCREMENT,
    passengerID int,
    number varchar(50) NOT NULL,
    expiration int NOT NULL,
    securityCode int NOT NULL,
    PRIMARY KEY (creditCardID),
    FOREIGN KEY (passengerID) REFERENCES Passengers(passengerID)
    ON DELETE CASCADE
);

--Create Airports table--
CREATE OR REPLACE TABLE Airports (
    airportID int NOT NULL AUTO_INCREMENT,
    city text(50) NOT NULL,
    state text(50),
    country text(50) NOT NULL,
    name varchar(50) NOT NULL,
    code varchar(50) NOT NULL,
    PRIMARY KEY (airportID)
);

--Create Flights table--
CREATE OR REPLACE TABLE Flights (
    flightID int NOT NULL AUTO_INCREMENT,
    originAirportID int NOT NULL,
    destinationAirportID int NOT NULL,
    airline varchar(50),
    duration int,
    numberOfSeats int,
    date date,
    departureTime varchar(50),
    arrivalTime varchar(50),
    PRIMARY KEY (flightID),
    FOREIGN KEY (originAirportID) REFERENCES Airports(airportID)
    ON DELETE CASCADE,
    FOREIGN KEY (destinationAirportID) REFERENCES Airports(airportID)
    ON DELETE CASCADE
);

--Create Tickets table--
CREATE OR REPLACE TABLE Tickets (
    ticketID int NOT NULL AUTO_INCREMENT,
    passengerID int NOT NULL,
    flightID int NOT NULL,
    price decimal(10,2),
    seatNumber varchar(10) NOT NULL,
    PRIMARY KEY (ticketID),
    FOREIGN KEY (passengerID) REFERENCES Passengers(passengerID)
    ON DELETE CASCADE,
    FOREIGN KEY (flightID) REFERENCES Flights(flightID)
    ON DELETE CASCADE
);


--Add data into Passengers table--
INSERT INTO Passengers (firstName, lastName, streetAddress, city, state, country)
    VALUES ('John', 'Doe', '123 Main St', 'Springfield', 'CA', 'USA'),  -- ID 1
    ('Jane', 'Doe', '456 Elm St', 'Austin', 'TX', 'USA'),               -- ID 2
    ('Bob', 'Smith', '789 Oak St', 'Miami', 'FL', 'USA'),               -- ID 3
    ('Alice', 'Johnson', '321 Pine St', 'Brooklyn', 'NY', 'USA'),       -- ID 4
    ('David', 'Lee', '654 Maple St', 'Seattle', 'WA', 'USA')   ;         -- ID 5
    -- ('Sarah', 'Brown', '987 Cedar St', 'Las Vegas', 'NV', 'USA'),       -- ID 6
    -- ('Michael', 'Davis', '246 Birch St', 'New Orleans', 'LA', 'USA'),   -- ID 7
    -- ('Emily', 'Taylor', '135 Walnut St', 'Richmond', 'VA', 'USA'),      -- ID 8
    -- ('Steven', 'Wilson', '864 Pine St', 'Phoenix', 'AZ', 'USA'),        -- ID 9
    -- ('Melissa', 'Harris', '975 Oak St', 'Charlotte', 'NC', 'USA'),      -- ID 10
    -- ('Alex', 'Jones', '531 Maple St', 'Detroit', 'MI', 'USA'),          -- ID 11
    -- ('Laura', 'Jackson', '258 Cedar St', 'Chicago', 'IL', 'USA'),       -- ID 12
    -- ('Christopher', 'White', '753 Elm St', 'Denver', 'CO', 'USA'),      -- ID 13
    -- ('Elizabeth', 'Martin', '468 Walnut St', 'Cleveland', 'OH', 'USA'), -- ID 14
    -- ('Daniel', 'Moore', '369 Pine St', 'Philadelphia', 'PA', 'USA'),    -- ID 15
    -- ('Jennifer', 'Wilson', '582 Birch St', 'Nashville', 'TN', 'USA'),   -- ID 16
    -- ('Matthew', 'Johnson', '174 Oak St', 'Lexington', 'KY', 'USA'),     -- ID 17
    -- ('Jessica', 'Garcia', '937 Cedar St', 'Atlanta', 'GA', 'USA'),      -- ID 18
    -- ('Ryan', 'Smith', '246 Elm St', 'Jackson', 'MS', 'USA'),            -- ID 19
    -- ('Amanda', 'Lee', '753 Pine St', 'Newark', 'NJ', 'USA')             -- ID 20



--Add data into CreditCards table--
INSERT INTO CreditCards (passengerID, number, expiration, securityCode)
VALUES 
    (1, '4929196622697514', '0624', '345'),
    (2, '5386372252677403', '0225', '148'),
    (3, '4916586511550596', '1122', '714'),
    (4, '5248017824410027', '0923', '862'),
    (5, '4556467551533156', '0525', '372');
    -- (6, '5215487347610987', '0724', '235'),
    -- (7, '4716584828598869', '1223', '467'),
    -- (8, '5460735762369821', '0824', '699'),
    -- (9, '4532926971151387', '0326', '519'),
    -- (10, '5151521556257426', '1122', '391'),
    -- (11, '4024007107756134', '0624', '920'),
    -- (12, '5554506638120732', '0423', '770'),
    -- (13, '4916430136232398', '0924', '712'),
    -- (14, '5228201838786989', '0722', '498'),
    -- (15, '1453968637415681', '0627', '777');



--Add data into Airports table--
INSERT INTO Airports (city, state, country, name, code)
VALUES
    ('Atlanta', 'GA', 'United States', 'Hartsfield-Jackson Atlanta International Airport', 'ATL'),  -- ID 1
    ('Los Angeles', 'CA', 'United States', 'Los Angeles International Airport', 'LAX'),             -- ID 2
    ('Chicago', 'IL', 'United States', 'O''Hare International Airport', 'ORD'),                     -- ID 3
    ('Dallas/Fort Worth', 'TX', 'United States', 'Dallas/Fort Worth International Airport', 'DFW'), -- ID 4
    ('Denver', 'CO', 'United States', 'Denver International Airport', 'DEN');                       -- ID 5
    -- ('New York', 'NY', 'United States', 'John F. Kennedy International Airport', 'JFK'),            -- ID 6
    -- ('San Francisco', 'CA', 'United States', 'San Francisco International Airport', 'SFO'),         -- ID 7 
    -- ('Seattle/Tacoma', 'WA', 'United States', 'Seattle-Tacoma International Airport', 'SEA'),       -- ID 8
    -- ('McCarran', 'NV', 'United States', 'McCarran International Airport', 'LAS'),                   -- ID 9
    -- ('Charlotte', 'NC', 'United States', 'Charlotte Douglas International Airport', 'CLT'),         -- ID 10
    -- ('Phoenix', 'AZ', 'United States', 'Phoenix Sky Harbor International Airport', 'PHX'),          -- ID 11
    -- ('Dubai', NULL, 'United Arab Emirates', 'Dubai International Airport', 'DXB'),                  -- ID 12
    -- ('London', NULL, 'United Kingdom', 'Heathrow Airport', 'LHR'),                                  -- ID 13
    -- ('Hong Kong', NULL, 'Hong Kong SAR', 'Hong Kong International Airport', 'HKG'),                 -- ID 14
    -- ('Shanghai', NULL, 'China', 'Shanghai Pudong International Airport', 'PVG'),                    -- ID 15
    -- ('Paris', NULL, 'France', 'Charles de Gaulle Airport', 'CDG'),                                  -- ID 16
    -- ('Amsterdam', NULL, 'Netherlands', 'Amsterdam Airport Schiphol', 'AMS'),                        -- ID 17
    -- ('Tokyo', NULL, 'Japan', 'Narita International Airport', 'NRT'),                                -- ID 18
    -- ('Istanbul', NULL, 'Turkey', 'Istanbul Ataturk Airport', 'IST'),                                -- ID 19
    -- ('Frankfurt', NULL, 'Germany', 'Frankfurt Airport', 'FRA');                                     -- ID 20



--Add data into Flights table--
INSERT INTO Flights (originAirportID, destinationAirportID, airline, duration, numberOfSeats, date, departureTime, arrivalTime)
VALUES
    (1, 2, 'Delta Airlines', 180, 250, '2023-05-10', '09:00 AM', '12:00 PM'),      -- ID 1
    (3, 4, 'United Airlines', 120, 200, '2023-06-01', '06:30 PM', '08:30 PM'),     -- ID 2
    (5, 1, 'American Airlines', 240, 300, '2023-05-25', '10:00 AM', '02:00 PM'),   -- ID 3
    (2, 4, 'Southwest Airlines', 90, 150, '2023-05-08', '03:30 PM', '05:00 PM'),    -- ID 4
    (3, 5, 'Delta Airlines', 150, 200, '2023-06-14', '07:30 AM', '10:00 AM')  ;     -- ID 5
    -- (10, 18, 'United Airlines', 120, 150, '2023-05-17', '12:00 PM', '02:00 PM'),    -- ID 6 
    -- (14, 3, 'American Airlines', 180, 250, '2023-05-12', '08:00 AM', '11:00 AM'),   -- ID 7
    -- (7, 20, 'Southwest Airlines', 120, 200, '2023-06-07', '02:30 PM', '04:30 PM'),  -- ID 8
    -- (12, 1, 'Delta Airlines', 240, 300, '2023-05-21', '11:00 AM', '03:00 PM'),      -- ID 9
    -- (17, 15, 'United Airlines', 150, 150, '2023-06-28', '09:00 AM', '11:30 AM');    -- ID 10


    
--Add data into Tickets table--
INSERT INTO Tickets (passengerID, flightID, price, seatNumber)
VALUES
    (5, 1, 350.00, '12A'),      -- ID 1
    (2, 1, 250.00, '23C'),     -- ID 2
    (1, 3, 420.50, '10B'),     -- ID 3
    (1, 2, 280.00, '15D'),      -- ID 4
    (3, 5, 320.75, '18F'),      -- ID 5
    (4, 2, 450.00, '07A'),     -- ID 6
    (4, 4, 275.50, '14C'),     -- ID 7
    (1, 1, 360.00, '22B'),     -- ID 8
    (2, 4, 295.25, '19E'),      -- ID 9
    (3, 3, 500.00, '06A');     -- ID 10



SET FOREIGN_KEY_CHECKS = 1;
COMMIT;