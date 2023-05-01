-- recommended from Project Step 2 specs page
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- [your SQL goes here]

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















SET FOREIGN_KEY_CHECKS = 1;
COMMIT;