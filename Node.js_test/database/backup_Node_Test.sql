-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_swanalex
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Airports`
--

DROP TABLE IF EXISTS `Airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Airports` (
  `airportID` int(11) NOT NULL AUTO_INCREMENT,
  `city` tinytext NOT NULL,
  `state` tinytext DEFAULT NULL,
  `country` tinytext NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`airportID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Airports`
--

LOCK TABLES `Airports` WRITE;
/*!40000 ALTER TABLE `Airports` DISABLE KEYS */;
INSERT INTO `Airports` VALUES (1,'Atlanta','GA','United States','Hartsfield-Jackson Atlanta International Airport','ATL'),(2,'Los Angeles','CA','United States','Los Angeles International Airport','LAX'),(3,'Chicago','IL','United States','O\'Hare International Airport','ORD');
/*!40000 ALTER TABLE `Airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CreditCards`
--

DROP TABLE IF EXISTS `CreditCards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CreditCards` (
  `creditCardID` int(11) NOT NULL AUTO_INCREMENT,
  `passengerID` int(11),
  `number` varchar(50) NOT NULL,
  `expiration` int(11) NOT NULL,
  `securityCode` int(11) NOT NULL,
  PRIMARY KEY (`creditCardID`),
  KEY `passengerID` (`passengerID`),
  CONSTRAINT `CreditCards_ibfk_1` FOREIGN KEY (`passengerID`) REFERENCES `Passengers` (`passengerID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CreditCards`
--

LOCK TABLES `CreditCards` WRITE;
/*!40000 ALTER TABLE `CreditCards` DISABLE KEYS */;
INSERT INTO `CreditCards` VALUES (1,1,'4929196622697514',624,345),(2,2,'5386372252677403',225,148),(3,3,'4916586511550596',1122,714);
/*!40000 ALTER TABLE `CreditCards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flights`
--

DROP TABLE IF EXISTS `Flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Flights` (
  `flightID` int(11) NOT NULL AUTO_INCREMENT,
  `originAirportID` int(11) NOT NULL,
  `destinationAirportID` int(11) NOT NULL,
  `airline` varchar(50) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `numberOfSeats` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `departureTime` varchar(50) DEFAULT NULL,
  `arrivalTime` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flightID`),
  KEY `originAirportID` (`originAirportID`),
  KEY `destinationAirportID` (`destinationAirportID`),
  CONSTRAINT `Flights_ibfk_1` FOREIGN KEY (`originAirportID`) REFERENCES `Airports` (`airportID`) ON DELETE CASCADE,
  CONSTRAINT `Flights_ibfk_2` FOREIGN KEY (`destinationAirportID`) REFERENCES `Airports` (`airportID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flights`
--

LOCK TABLES `Flights` WRITE;
/*!40000 ALTER TABLE `Flights` DISABLE KEYS */;
INSERT INTO `Flights` VALUES (1,1,2,'Delta Airlines',180,250,'2023-05-10','09:00 AM','12:00 PM'),(2,2,3,'United Airlines',120,200,'2023-06-01','06:30 PM','08:30 PM'),(3,3,1,'American Airlines',240,300,'2023-05-25','10:00 AM','02:00 PM'),(4,2,1,'whatever airlines',222,898,'2023-10-10','5:55 AM','5:55 PM');
/*!40000 ALTER TABLE `Flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Passengers`
--

DROP TABLE IF EXISTS `Passengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Passengers` (
  `passengerID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `streetAddress` varchar(50) DEFAULT NULL,
  `city` tinytext DEFAULT NULL,
  `state` tinytext DEFAULT NULL,
  `country` tinytext DEFAULT NULL,
  PRIMARY KEY (`passengerID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Passengers`
--

LOCK TABLES `Passengers` WRITE;
/*!40000 ALTER TABLE `Passengers` DISABLE KEYS */;
INSERT INTO `Passengers` VALUES (1,'John','Dope','123 Main St','Springfield','CA','USA'),(2,'Jane','Doe','456 Elm St','Austin','TX','USA'),(3,'Bob','Smith','789 Oak St','Miami','FL','USA');
/*!40000 ALTER TABLE `Passengers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tickets`
--

DROP TABLE IF EXISTS `Tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tickets` (
  `ticketID` int(11) NOT NULL AUTO_INCREMENT,
  `passengerID` int(11) NOT NULL,
  `flightID` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `seatNumber` varchar(10) NOT NULL,
  PRIMARY KEY (`ticketID`),
  KEY `passengerID` (`passengerID`),
  KEY `flightID` (`flightID`),
  CONSTRAINT `Tickets_ibfk_1` FOREIGN KEY (`passengerID`) REFERENCES `Passengers` (`passengerID`) ON DELETE CASCADE,
  CONSTRAINT `Tickets_ibfk_2` FOREIGN KEY (`flightID`) REFERENCES `Flights` (`flightID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tickets`
--

LOCK TABLES `Tickets` WRITE;
/*!40000 ALTER TABLE `Tickets` DISABLE KEYS */;
INSERT INTO `Tickets` VALUES (1,2,1,350.00,'12A'),(2,3,3,250.00,'23C'),(3,3,2,420.50,'10B');
/*!40000 ALTER TABLE `Tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnostic`
--

DROP TABLE IF EXISTS `diagnostic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diagnostic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostic`
--

LOCK TABLES `diagnostic` WRITE;
/*!40000 ALTER TABLE `diagnostic` DISABLE KEYS */;
INSERT INTO `diagnostic` VALUES (1,'MySQL is working!');
/*!40000 ALTER TABLE `diagnostic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-11 16:50:02
