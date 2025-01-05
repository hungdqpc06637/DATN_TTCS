-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: thoitrangnam
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) DEFAULT NULL,
  `Fullname` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Activated` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'admin','giám đốc','john11@example.com','john.jpg','1234567890','$2a$10$fue.2Yh5RjbfMd1VAMO5LeOlZYPdLc1NUBInsN/wO7vZE2EAkv1yS',1),(2,'staff','Nhan vien','jane1@example.com','jane.jpg','0987654321','$2a$10$UHnEnJ/QK9ChuaDDTl4ZNe4PkCFM7PDUpiL.jMpj3qNxb3Uu22Qb.',1),(3,'user','người dùng','janeasassa@example.com','jane.jpg','0987654321','$2a$10$/ttYTCyWW7yt6xnJeJGepOiyvG.i1QWU5ZIKY/NUAMuVBZoTNLxPK',1),(15,'DINHHUNG','Đinh Hưng','so5so6vaso9@gmail.com',NULL,NULL,'$2a$10$YGumrad4ETJnfEGzSr/Elu01ykfAQ70lTfqxIpXbeCNvH6DQKdNCG',1),(17,'Dinh Quoc Hung (FPL CT)','Dinh Quoc Hung (FPL CT)','hungdqpc06637@fpt.edu.vn',NULL,'0359032559',NULL,1),(19,'Nguyen Nhat Duy (FPL CT)','Nguyen Nhat Duy (FPL CT)','duynnpc06626@fpt.edu.vn',NULL,'0944406481',NULL,1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Province` varchar(100) DEFAULT NULL,
  `District` varchar(100) DEFAULT NULL,
  `Ward` varchar(100) DEFAULT NULL,
  `Note` varchar(255) DEFAULT NULL,
  `AccountID` int DEFAULT NULL,
  `Fullname` varchar(200) DEFAULT NULL,
  `Phone` int DEFAULT NULL,
  `isdefault` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `FK_Address_Account` (`AccountID`),
  CONSTRAINT `FK_Address_Account` FOREIGN KEY (`AccountID`) REFERENCES `account` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Province A','District A','Ward A','Note A',1,'DINH QUOC HUNG',327247263,0),(2,'a','a','a','123',3,'1',1,0),(3,'Province B','District B','Ward B','Note B',2,'A',327247263,0),(7,'Cà Mau','Thới Bìnhhh','Trí phải','huyện sử',15,'ngan',32724562,1),(9,'Sóc Trăng','Mỹ tú','châu thành','123 lam lam',3,'kim ngân',359032559,0),(11,'Cần thơ','Ninh Kiều','Hưng Lợi','Hẻm 553, Đường 30/4',1,'NGUYỄN NHẬT DUY',944406481,1);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authorities`
--

DROP TABLE IF EXISTS `authorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authorities` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `AccountID` int DEFAULT NULL,
  `RoleID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_Authorities_Account` (`AccountID`),
  KEY `FK_Authorities_Role` (`RoleID`),
  CONSTRAINT `FK_Authorities_Account` FOREIGN KEY (`AccountID`) REFERENCES `account` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Authorities_Role` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorities`
--

LOCK TABLES `authorities` WRITE;
/*!40000 ALTER TABLE `authorities` DISABLE KEYS */;
INSERT INTO `authorities` VALUES (1,1,1),(2,2,2),(3,3,3),(46,15,3),(47,17,1),(48,19,3);
/*!40000 ALTER TABLE `authorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Quantity` int DEFAULT NULL,
  `SizeID` int DEFAULT NULL,
  `AccountID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_Carts_Account` (`AccountID`),
  KEY `FK_Carts_Size` (`SizeID`),
  CONSTRAINT `FK_Carts_Account` FOREIGN KEY (`AccountID`) REFERENCES `account` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Carts_Size` FOREIGN KEY (`SizeID`) REFERENCES `size` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'ÁO SƠ MI'),(2,'QUẦN KAKI'),(3,'ÁO LEN'),(4,'QUẦN ÂU'),(5,'QUẦN JEANS'),(6,'ÁO POLO'),(7,'QUẦN SHORT'),(8,'GIÀY');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'red'),(2,'blue'),(3,'black'),(4,'white'),(5,'blue'),(6,'#c4c06d'),(7,'#000000'),(8,'#4a90e2'),(9,'#FF0000'),(10,'#b4cae2'),(12,'#a0cafc'),(13,'#e8edf5'),(14,'#4986e6'),(15,'#92b5f0'),(16,'#0641a0'),(17,'#5f93e4'),(18,'#0c1022'),(19,'#091a68'),(20,'#adb6e4'),(21,'#ffffff'),(22,'#68a4eb'),(23,'#1f67bd'),(24,'#8bbcf6'),(25,'#0c0c0c'),(26,'#1364c3'),(27,'#d9dadd'),(28,'#031550'),(29,'#283f8f'),(30,'#8fbef5'),(31,'#09274d'),(32,'#95bff1'),(33,'#2e6fbd'),(34,'#e1e8f1'),(35,'#9b9b9b'),(36,'#0a2b50'),(37,'#6e747c'),(38,'#858c96'),(39,'#091d35'),(40,'#271010'),(41,'#092342'),(42,'#0e0d0d'),(43,'#002c5d'),(44,'#d1cda8'),(45,'#31537a'),(46,'#dbd8ac'),(47,'#e9e8dd'),(48,'#cac48e'),(49,'#6b222b'),(50,'#09294e'),(51,'#c3c286'),(52,'#4d3a2a'),(53,'#d6d4b3'),(54,'#d4d084'),(55,'#4a4a4a'),(56,'#632e03'),(57,'#41050d'),(58,'#69370b');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite`
--

DROP TABLE IF EXISTS `favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourite` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `SizeID` int DEFAULT NULL,
  `AccountID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_Favourite_Account` (`AccountID`),
  KEY `FK_Favourite_Size` (`SizeID`),
  CONSTRAINT `FK_Favourite_Account` FOREIGN KEY (`AccountID`) REFERENCES `account` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Favourite_Size` FOREIGN KEY (`SizeID`) REFERENCES `size` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite`
--

LOCK TABLES `favourite` WRITE;
/*!40000 ALTER TABLE `favourite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flashsale`
--

DROP TABLE IF EXISTS `flashsale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashsale` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Startdate` datetime NOT NULL,
  `Enddate` datetime NOT NULL,
  `Isactive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashsale`
--

LOCK TABLES `flashsale` WRITE;
/*!40000 ALTER TABLE `flashsale` DISABLE KEYS */;
INSERT INTO `flashsale` VALUES (2,'TẾT 2025','2024-12-25 00:00:00','2025-01-31 23:59:59',1),(3,'Flash Sale Black Friday','2024-11-14 00:00:00','2024-11-25 23:59:59',0);
/*!40000 ALTER TABLE `flashsale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `SizeID` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_OrderDetails_Orders` (`OrderID`),
  KEY `FK_OrderDetails_Size` (`SizeID`),
  CONSTRAINT `FK_OrderDetails_Orders` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_OrderDetails_Size` FOREIGN KEY (`SizeID`) REFERENCES `size` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (27,40,147500.00,877,1),(28,40,337500.00,594,1),(29,40,150000.00,941,2),(30,40,149750.00,747,1),(31,40,200000.00,947,1),(32,40,136250.00,729,1);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `AccountID` int DEFAULT NULL,
  `Date` datetime DEFAULT CURRENT_TIMESTAMP,
  `AddressID` int DEFAULT NULL,
  `Note` varchar(255) DEFAULT NULL,
  `PaymentID` int DEFAULT NULL,
  `shipping_method_id` int DEFAULT NULL,
  `Status` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_Orders_Account` (`AccountID`),
  KEY `FK_Orders_Address` (`AddressID`),
  KEY `FK_Orders_Payment` (`PaymentID`),
  KEY `FK_Orders_ShippingMethod` (`shipping_method_id`),
  CONSTRAINT `FK_Orders_Account` FOREIGN KEY (`AccountID`) REFERENCES `account` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `FK_Orders_Address` FOREIGN KEY (`AddressID`) REFERENCES `address` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `FK_Orders_Payment` FOREIGN KEY (`PaymentID`) REFERENCES `payment` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `FK_Orders_ShippingMethod` FOREIGN KEY (`shipping_method_id`) REFERENCES `shippingmethods` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (31,15,'2024-10-11 11:41:07',7,'abc',2,1,4),(37,1,'2024-11-15 20:00:55',1,'ship tận giường nha shop',2,1,4),(38,15,'2024-11-15 20:14:44',7,'kh vui bomm hàng',1,1,5),(40,1,'2024-12-27 23:44:48',11,'ĐÓNG HÀNG KỈ GIÚP EM Ạ',2,2,4);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Method` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'Thanh toán qua ví VNPay'),(2,'Thanh toán khi nhận hàng');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_flashsale`
--

DROP TABLE IF EXISTS `product_flashsale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_flashsale` (
  `ProductID` int NOT NULL,
  `FlashsaleID` int NOT NULL,
  `Discount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ProductID`,`FlashsaleID`),
  KEY `FlashsaleID` (`FlashsaleID`),
  CONSTRAINT `product_flashsale_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `product_flashsale_ibfk_2` FOREIGN KEY (`FlashsaleID`) REFERENCES `flashsale` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_flashsale`
--

LOCK TABLES `product_flashsale` WRITE;
/*!40000 ALTER TABLE `product_flashsale` DISABLE KEYS */;
INSERT INTO `product_flashsale` VALUES (1,3,12.00),(4,3,12.00),(6,2,50.00),(6,3,22.00),(11,2,50.00),(11,3,16.00),(17,3,32.00),(25,2,50.00),(26,3,32.00),(42,2,50.00),(42,3,13.00),(44,3,13.00),(46,3,13.00),(47,3,13.00),(49,2,50.00),(53,2,50.00),(55,3,13.00),(56,2,50.00),(61,2,50.00),(63,3,13.00),(66,3,13.00),(68,2,50.00),(71,3,13.00),(72,2,50.00),(72,3,13.00),(73,3,13.00),(76,2,50.00),(81,2,50.00);
/*!40000 ALTER TABLE `product_flashsale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productimages`
--

DROP TABLE IF EXISTS `productimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productimages` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ProductsID` int DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ProductImages_Products` (`ProductsID`),
  CONSTRAINT `FK_ProductImages_Products` FOREIGN KEY (`ProductsID`) REFERENCES `products` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=880 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimages`
--

LOCK TABLES `productimages` WRITE;
/*!40000 ALTER TABLE `productimages` DISABLE KEYS */;
INSERT INTO `productimages` VALUES (1,1,'sanpham1.jpg'),(3,1,'sanpham1-1.jpg'),(4,1,'sanpham1-2.jpg'),(5,1,'sanpham1-3.jpg'),(32,3,'somi1.webp'),(33,3,'somi1-1.webp'),(35,3,'somi1-3.webp'),(36,4,'somi2.webp'),(37,4,'somi2-1.webp'),(38,4,'somi2-2.webp'),(39,4,'somi2-3.webp'),(40,5,'somi3.webp'),(41,5,'somi3-1.webp'),(42,5,'somi3-2.webp'),(43,5,'somi3-3.webp'),(44,6,'somi4.webp'),(45,6,'somi4-1.webp'),(46,6,'somi4-2.webp'),(47,6,'somi4-3.webp'),(49,7,'somi5-1.webp'),(50,7,'somi5-2.webp'),(51,7,'somi5-3.webp'),(52,8,'somi6.webp'),(53,8,'somi6-1.webp'),(55,8,'somi6-3.webp'),(56,9,'somi7.webp'),(57,9,'somi7-1.webp'),(58,9,'somi7-2.webp'),(59,9,'somi7-3.webp'),(60,10,'somi8.webp'),(61,10,'somi8-1.webp'),(62,10,'somi8-2.webp'),(63,10,'somi8-3.webp'),(64,11,'somi9.webp'),(65,11,'somi9-1.webp'),(66,11,'somi9-2.webp'),(67,11,'somi9-3.webp'),(68,12,'somi10.webp'),(69,12,'somi10-1.webp'),(70,12,'somi10-2.webp'),(71,12,'somi10-3.webp'),(72,13,'somi11.webp'),(73,13,'somi11-1.webp'),(74,13,'somi11-2.webp'),(75,13,'somi11-3.webp'),(76,14,'somi12.webp'),(77,14,'somi12-1.webp'),(78,14,'somi12-2.webp'),(79,14,'somi12-3.webp'),(80,15,'somi13.webp'),(81,15,'somi13-1.webp'),(82,15,'somi13-2.webp'),(83,15,'somi13-3.webp'),(84,16,'somi14.webp'),(85,16,'somi14-1.webp'),(86,16,'somi14-2.webp'),(87,16,'somi14-3.webp'),(88,17,'somi15.webp'),(89,17,'somi15-1.webp'),(90,17,'somi15-2.webp'),(91,17,'somi15-3.webp'),(92,18,'somi16.webp'),(93,18,'somi16-1.webp'),(94,18,'somi16-2.webp'),(95,18,'somi16-3.webp'),(96,19,'somi17.webp'),(97,19,'somi17-1.webp'),(98,19,'somi17-2.webp'),(99,19,'somi17-3.webp'),(100,20,'somi18.webp'),(101,20,'somi18-1.webp'),(102,20,'somi18-2.webp'),(103,20,'somi18-3.webp'),(594,21,'somi19.webp'),(595,21,'somi19-1.webp'),(596,21,'somi19-2.webp'),(597,21,'somi19-3.webp'),(598,22,'somi20.webp'),(599,22,'somi20-1.webp'),(600,22,'somi20-2.webp'),(601,22,'somi20-3.webp'),(602,23,'somi21.webp'),(603,23,'somi21-1.webp'),(604,23,'somi21-2.webp'),(605,23,'somi21-3.webp'),(606,24,'somi22.webp'),(607,24,'somi22-1.webp'),(608,24,'somi22-2.webp'),(609,24,'somi22-3.webp'),(610,25,'somi23.webp'),(611,25,'somi23-1.webp'),(612,25,'somi23-2.webp'),(613,25,'somi23-3.webp'),(614,26,'somi24.webp'),(615,26,'somi24-1.webp'),(616,26,'somi24-2.webp'),(617,26,'somi24-3.webp'),(618,27,'somi25.webp'),(623,28,'somi26-1.webp'),(624,28,'somi26-2.webp'),(625,28,'somi26-3.webp'),(626,29,'somi27.webp'),(627,29,'somi27-1.webp'),(628,29,'somi27-2.webp'),(629,29,'somi27-3.webp'),(630,30,'somi28.webp'),(631,30,'somi28-1.webp'),(632,30,'somi28-2.webp'),(633,30,'somi28-3.webp'),(634,31,'somi29.webp'),(635,31,'somi29-1.webp'),(636,31,'somi29-2.webp'),(637,31,'somi29-3.webp'),(638,32,'somi30.webp'),(639,32,'somi30-1.webp'),(640,32,'somi30-2.webp'),(641,32,'somi30-3.webp'),(642,33,'somi31.webp'),(643,33,'somi31-1.webp'),(644,33,'somi31-2.webp'),(645,33,'somi31-3.webp'),(646,34,'somi32.webp'),(647,34,'somi32-1.webp'),(648,34,'somi32-2.webp'),(649,34,'somi32-3.webp'),(654,36,'somi34.webp'),(655,36,'somi34-1.webp'),(656,36,'somi34-2.webp'),(657,36,'somi34-3.webp'),(658,37,'somi35.webp'),(659,37,'somi35-1.webp'),(660,37,'somi35-2.webp'),(661,37,'somi35-3.webp'),(662,38,'somi36.webp'),(663,38,'somi36-1.webp'),(664,38,'somi36-2.webp'),(665,38,'somi36-3.webp'),(666,39,'somi37.webp'),(667,39,'somi37-1.webp'),(668,39,'somi37-2.webp'),(669,39,'somi37-3.webp'),(670,40,'somi38.webp'),(671,40,'somi38-1.webp'),(672,40,'somi38-2.webp'),(673,40,'somi38-3.webp'),(674,41,'somi39.webp'),(675,41,'somi39-1.webp'),(676,41,'somi39-2.webp'),(677,41,'somi39-3.webp'),(678,42,'somi40.webp'),(679,42,'somi40-1.webp'),(680,42,'somi40-2.webp'),(681,42,'somi40-3.webp'),(682,43,'somi41.webp'),(683,43,'somi41-1.webp'),(684,43,'somi41-2.webp'),(685,43,'somi41-3.webp'),(686,44,'somi42.webp'),(687,44,'somi42-1.webp'),(688,44,'somi42-2.webp'),(689,44,'somi42-3.webp'),(690,45,'somi43.webp'),(691,45,'somi43-1.webp'),(692,45,'somi43-2.webp'),(693,45,'somi43-3.webp'),(694,46,'somi44.webp'),(695,46,'somi44-1.webp'),(696,46,'somi44-2.webp'),(697,46,'somi44-3.webp'),(698,47,'somi45.webp'),(699,47,'somi45-1.webp'),(700,47,'somi45-2.webp'),(701,47,'somi45-3.webp'),(702,48,'somi46.webp'),(703,48,'somi46-1.webp'),(704,48,'somi46-2.webp'),(705,48,'somi46-3.webp'),(706,49,'somi47.webp'),(707,49,'somi47-1.webp'),(708,49,'somi47-2.webp'),(709,49,'somi47-3.webp'),(710,50,'somi48.webp'),(711,50,'somi48-1.webp'),(712,50,'somi48-2.webp'),(713,50,'somi48-3.webp'),(714,51,'quan1.webp'),(715,51,'quan1-1.webp'),(716,52,'quan2.webp'),(717,53,'quan3.webp'),(718,53,'quan3-1.webp'),(719,54,'quan4.webp'),(720,54,'quan4-1.webp'),(721,56,'quan6.webp'),(722,56,'quan6-1.webp'),(723,56,'quan6-2.webp'),(724,56,'quan6-3.webp'),(725,57,'quan7.webp'),(726,57,'quan7-1.webp'),(727,57,'quan7-2.webp'),(728,57,'quan7-3.webp'),(729,58,'quan8.webp'),(730,58,'quan8-1.webp'),(731,58,'quan8-2.webp'),(732,58,'quan8-3.webp'),(733,59,'quan9.webp'),(734,59,'quan9-1.webp'),(735,59,'quan9-2.webp'),(736,59,'quan9-3.webp'),(737,60,'quan10.webp'),(738,60,'quan10-1.webp'),(739,60,'quan10-2.webp'),(740,60,'quan10-3.webp'),(741,61,'quan11.webp'),(742,61,'quan11-1.webp'),(743,61,'quan11-2.webp'),(744,61,'quan11-3.webp'),(745,62,'quan12.webp'),(746,62,'quan12-1.webp'),(747,63,'quan13.webp'),(748,63,'quan13-1.webp'),(749,64,'quan14.webp'),(750,64,'quan14-1.webp'),(751,65,'quan15.webp'),(752,65,'quan15-1.webp'),(753,66,'quan16.webp'),(754,66,'quan16-1.webp'),(755,67,'quan18.webp'),(756,68,'quan19.webp'),(757,68,'quan19-1.webp'),(758,69,'quan20.webp'),(759,69,'quan20-1.webp'),(760,70,'quan21.webp'),(761,70,'quan21-1.webp'),(762,71,'quan22.webp'),(763,71,'quan22-1.webp'),(764,55,'quan5.webp'),(765,55,'quan5-1.webp'),(776,74,'GD95.jpg'),(777,74,'GD95-2.jpg'),(778,74,'GD95-3.jpg'),(779,75,'GVN05.jpg'),(780,75,'GVN052-2.jpg'),(781,75,'GVN05-3.jpg'),(782,76,'giay-da-nam-cong-so-chat-luong-tot-gia-re.jpg'),(783,76,'giay-da-nam-cong-so-chat-luong-tot-gia-re-0.jpg'),(784,76,'giay-da-nam-cong-so-chat-luong-tot-gia-re-2.jpg'),(786,77,'giay-cong-so-nam-loafer-dap-van-an-tuong-nam-tinh.jpg'),(787,77,'giay-cong-so-nam-loafer-dap-van-an-tuong-nam-tinh-0.jpg'),(788,77,'giay-cong-so-nam-loafer-dap-van-an-tuong-nam-tinh-5.jpg'),(789,78,'giay-da-nam-han-quoc-duc-lo-thoang-khi-lich-lam.jpg'),(790,78,'giay-da-nam-han-quoc-duc-lo-thoang-khi-lich-lam-0.jpg'),(791,78,'giay-da-nam-han-quoc-duc-lo-thoang-khi-lich-lam-2.jpg'),(792,79,'giay-nam-bong-da-bo-that-thoi-thuong-quy-phai.jpg'),(793,79,'giay-nam-bong-da-bo-that-thoi-thuong-quy-phai-2.jpg'),(794,79,'giay-nam-bong-da-bo-that-thoi-thuong-quy-phai-3.jpg'),(795,80,'giay-da-nam-da-bo-that-classic-lich-lam.jpg'),(796,80,'giay-da-nam-da-bo-that-classic-lich-lam-1.jpg'),(797,80,'giay-da-nam-da-bo-that-classic-lich-lam-2.jpg'),(798,81,'giay-luoi-nam-da-bo-that-hang-hieu-cao-cap.jpg'),(799,81,'giay-luoi-nam-da-bo-that-hang-hieu-cao-cap-0.jpg'),(800,81,'giay-luoi-nam-da-bo-that-hang-hieu-cao-cap-5.jpg'),(801,82,'giay-tay-nam-hai-van-den-bong-phong-do.jpg'),(802,82,'giay-tay-nam-hai-van-den-bong-phong-do-1.jpg'),(803,82,'giay-tay-nam-hai-van-den-bong-phong-do-3.jpg'),(807,72,'Quan short nam SRS9074.1.webp'),(808,72,'Quan short nam SRS9074.2.webp'),(809,72,'Quan short nam SRS9074.5.webp'),(810,73,'Quan short nam Vitimex SRS9072 (2).webp'),(811,73,'Quan short nam Vitimex SRS9072 (1).webp'),(812,73,'Quan short nam Vitimex SRS9072 (5).webp'),(813,1,'sizeao.jpg'),(819,3,'sizeao.jpg'),(820,4,'sizeao.jpg'),(821,5,'sizeao.jpg'),(822,6,'sizeao.jpg'),(823,7,'sizeao.jpg'),(824,8,'sizeao.jpg'),(825,9,'sizeao.jpg'),(826,10,'sizeao.jpg'),(827,11,'sizeao.jpg'),(828,12,'sizeao.jpg'),(829,13,'sizeao.jpg'),(830,15,'sizeao.jpg'),(831,14,'sizeao.jpg'),(832,16,'sizeao.jpg'),(833,17,'sizeao.jpg'),(834,18,'sizeao.jpg'),(835,19,'sizeao.jpg'),(836,20,'sizeao.jpg'),(837,27,'ARD7789_2.webp'),(838,27,'ARD7789_4.webp'),(839,27,'ARD7789.webp'),(840,27,'sizeao.jpg'),(841,41,'sizeao.jpg'),(842,42,'sizeao.jpg'),(843,45,'sizeao.jpg'),(844,46,'sizeao.jpg'),(845,51,'sizequanau.webp'),(846,52,'QKK9053F.webp'),(847,52,'sizequanau.webp'),(848,53,'sizequanau.webp'),(849,54,'sizequanau.webp'),(850,55,'sizequanau.webp'),(851,56,'sizequanjean.webp'),(852,57,'sizequanjean.webp'),(853,58,'sizequankaki.webp'),(854,59,'sizequankaki.webp'),(855,60,'sizequankaki.webp'),(856,61,'sizequankaki.webp'),(857,62,'sizequankaki.webp'),(858,63,'sizequankaki.webp'),(859,64,'sizequankaki.webp'),(860,65,'sizequankaki.webp'),(861,66,'sizequankaki.webp'),(862,67,'QKK9053F.webp'),(863,67,'sizequankaki.webp'),(864,68,'sizequankaki.webp'),(865,69,'sizequankaki.webp'),(866,70,'sizequankaki.webp'),(867,71,'sizequankaki.webp'),(868,72,'sizequandui.webp'),(869,73,'sizequandui.webp'),(870,74,'sizegiay.jpg'),(871,75,'sizegiay.jpg'),(872,76,'sizegiay.jpg'),(873,77,'sizegiay.jpg'),(874,78,'sizegiay.jpg'),(875,79,'sizegiay.jpg'),(876,80,'sizegiay.jpg'),(877,81,'sizegiay.jpg'),(878,82,'sizegiay.jpg');
/*!40000 ALTER TABLE `productimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Create_Date` datetime DEFAULT CURRENT_TIMESTAMP,
  `CategoryID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_Products_Category` (`CategoryID`),
  CONSTRAINT `FK_Products_Category` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Áo sơ mi dài tay dáng ôm cao cấp Vitimex ATD4012',229000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-27 23:33:43',1),(3,'Áo sơ mi dài tay dáng ôm cao cấp Vitimex ATD4015',719000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:33:58',1),(4,'Áo somi dài tay Vitimex ARD7780',565000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:34:12',1),(5,'Sơ mi dài tay Vitimex ARD7588',600000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:34:26',1),(6,'Sơ mi dài tay Regular Vitimex ARD7795',299000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-27 23:33:19',1),(7,'Áo sơ mi dài tay Vitimex ASD7831',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:34:56',1),(8,'Áo sơ mi dài tay Vitimex ASD7880',650000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:35:08',1),(9,'Áo sơ mi dài tay dáng ôm ASD7841',650000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:35:19',1),(10,'Áo sơ mi dài tay dáng ôm ASD7840',675000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:35:33',1),(11,'Áo sơ mi dài tay dáng ôm ASD7830',675000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:35:50',1),(12,'Áo sơ mi dài tay dáng rộng ARD7868',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:36:03',1),(13,'Áo sơ mi dài tay dáng rộng ARD7867',620000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:36:15',1),(14,'Áo sơ mi dài tay dáng rộng ARD7866',775000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:36:39',1),(15,'Áo sơ mi dài tay dáng rộng ARD7851',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:36:29',1),(16,'Áo sơ mi dài tay dáng rộng ARD7850',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:36:54',1),(17,'Sơ mi dài tay dáng ôm Vitimex ASD7862',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:37:09',1),(18,'Áo sơ mi dài tay dáng rộng ARD7843',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:37:22',1),(19,'Áo sơ mi dài tay dáng rộng ARD7805',650000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:37:35',1),(20,'Sơ mi dài tay body không túi Vitimex ABD7656',495000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:37:45',1),(21,'Sơ mi dài tay Regular Vitimex ARD7875',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:37:54',1),(22,'Sơ mi dài tay Regular Vitimex ARD7874',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:37:58',1),(23,'Áo sơ mi dài tay dáng rộng ARD7701',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:38:03',1),(24,'Áo sơ mi dài tay dáng ôm ASD7829',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:38:12',1),(25,'Áo sơ mi dài tay phom ôm ASD7823',650000.00,'Kiểu dáng: Form dáng Slimfit ôm gọn, tôn dáng','2024-10-23 15:32:10',1),(26,'Áo sơ mi dài tay phom ôm ASD7821',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:38:20',1),(27,'Áo somi dài tay Vitimex ARD7789',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:40:42',1),(28,'Áo sơ mi dài tay dang ôm ASD7810',650000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:38:33',1),(29,'Sơ mi dài tay Vitimex ARD7800',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:41:19',1),(30,'Sơ mi dài tay dáng ôm Vitimex ASD7822',625000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:41:24',1),(31,'Áo sơ mi dài tay Vitimex ARD7783',565000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:41:31',1),(32,'Áo sơ mi dài tay Vitimex ARD7782',565000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:41:34',1),(33,'Áo sơ mi dài tay Vitimex ARD7779',565000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.ái','2024-12-26 23:41:37',1),(34,'Áo sơ mi dài tay Vitimex ARD7777',565000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:41:42',1),(36,'Áo sơ mi dài tay Vitimex ARD7685',450000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:41:46',1),(37,'Áo sơ mi dài tay Vitimex ARD7684',450000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:41:53',1),(38,'Áo sơ mi dài tay Vitimex ARD7578',450000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:41:57',1),(39,'Sơ mi ngắn tay Vitimex ARC7765',545000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:42:02',1),(40,'Sơ mi ngắn tay Vitimex ARC7801',495000.00,'Áo sơ mi công sở nam là trang phục lịch sự, chuyên nghiệp, thường có thiết kế cổ bẻ, tay dài, dáng ôm hoặc suông. Chất liệu phổ biến như cotton, polyester, hoặc vải pha giúp thoáng mát và dễ chịu. Màu sắc thường là trắng, xanh nhạt, đen, hoặc có họa tiết kẻ sọc, caro nhẹ. Phù hợp phối với quần âu, vest, hoặc cà vạt cho các dịp làm việc, họp hành hoặc sự kiện trang trọng.','2024-12-26 23:42:08',1),(41,'Áo polo Vitimex ARC7685',490000.00,'Áo polo công sở nam là trang phục lịch sự pha chút năng động, thiết kế với cổ bẻ, tay ngắn, và hàng cúc ngắn ở cổ áo. Chất liệu thường là cotton hoặc vải thun co giãn, mang lại sự thoải mái và thoáng mát. Áo thường có màu trơn hoặc họa tiết đơn giản, dễ phối với quần âu, kaki, hoặc jeans, phù hợp cho môi trường làm việc và các dịp bán trang trọng.','2024-12-26 23:43:35',6),(42,'Áo polo nam Vitimex ATR3039',247500.00,'Áo polo công sở nam là trang phục lịch sự pha chút năng động, thiết kế với cổ bẻ, tay ngắn, và hàng cúc ngắn ở cổ áo. Chất liệu thường là cotton hoặc vải thun co giãn, mang lại sự thoải mái và thoáng mát. Áo thường có màu trơn hoặc họa tiết đơn giản, dễ phối với quần âu, kaki, hoặc jeans, phù hợp cho môi trường làm việc và các dịp bán trang trọng.','2024-12-26 23:43:52',6),(43,'Áo polo nam Vitimex ATR3038',495000.00,'Áo polo công sở nam là trang phục lịch sự pha chút năng động, thiết kế với cổ bẻ, tay ngắn, và hàng cúc ngắn ở cổ áo. Chất liệu thường là cotton hoặc vải thun co giãn, mang lại sự thoải mái và thoáng mát. Áo thường có màu trơn hoặc họa tiết đơn giản, dễ phối với quần âu, kaki, hoặc jeans, phù hợp cho môi trường làm việc và các dịp bán trang trọng.','2024-12-26 23:43:56',6),(44,'Áo polo nam Vitimex ATS3023',565000.00,'Áo polo công sở nam là trang phục lịch sự pha chút năng động, thiết kế với cổ bẻ, tay ngắn, và hàng cúc ngắn ở cổ áo. Chất liệu thường là cotton hoặc vải thun co giãn, mang lại sự thoải mái và thoáng mát. Áo thường có màu trơn hoặc họa tiết đơn giản, dễ phối với quần âu, kaki, hoặc jeans, phù hợp cho môi trường làm việc và các dịp bán trang trọng.','2024-12-26 23:44:00',6),(45,'Áo Polo nam Vitimex ATS3033',495000.00,'\nÁo len công sở nam là trang phục ấm áp, lịch sự, thường có thiết kế cổ tròn hoặc cổ chữ V. Chất liệu len mềm mại, co giãn tốt, mang lại cảm giác thoải mái và giữ ấm hiệu quả. Màu sắc thường trơn hoặc có họa tiết tối giản, dễ phối cùng áo sơ mi, quần âu hoặc kaki, phù hợp cho môi trường làm việc trong mùa lạnh.','2024-12-26 23:45:25',3),(46,'Áo len nam Vitimex ALN3004',445000.00,'\nÁo len công sở nam là trang phục ấm áp, lịch sự, thường có thiết kế cổ tròn hoặc cổ chữ V. Chất liệu len mềm mại, co giãn tốt, mang lại cảm giác thoải mái và giữ ấm hiệu quả. Màu sắc thường trơn hoặc có họa tiết tối giản, dễ phối cùng áo sơ mi, quần âu hoặc kaki, phù hợp cho môi trường làm việc trong mùa lạnh.','2024-12-26 23:45:38',3),(47,'Áo len nam Vitimex ALNT004',160000.00,'\nÁo len công sở nam là trang phục ấm áp, lịch sự, thường có thiết kế cổ tròn hoặc cổ chữ V. Chất liệu len mềm mại, co giãn tốt, mang lại cảm giác thoải mái và giữ ấm hiệu quả. Màu sắc thường trơn hoặc có họa tiết tối giản, dễ phối cùng áo sơ mi, quần âu hoặc kaki, phù hợp cho môi trường làm việc trong mùa lạnh.','2024-12-26 23:45:44',3),(48,'Áo len nam Vitimex ALN3009',445000.00,'\nÁo len công sở nam là trang phục ấm áp, lịch sự, thường có thiết kế cổ tròn hoặc cổ chữ V. Chất liệu len mềm mại, co giãn tốt, mang lại cảm giác thoải mái và giữ ấm hiệu quả. Màu sắc thường trơn hoặc có họa tiết tối giản, dễ phối cùng áo sơ mi, quần âu hoặc kaki, phù hợp cho môi trường làm việc trong mùa lạnh.otton','2024-12-26 23:45:48',3),(49,'Áo len nam Vitimex ALNT003',400000.00,'\nÁo len công sở nam là trang phục ấm áp, lịch sự, thường có thiết kế cổ tròn hoặc cổ chữ V. Chất liệu len mềm mại, co giãn tốt, mang lại cảm giác thoải mái và giữ ấm hiệu quả. Màu sắc thường trơn hoặc có họa tiết tối giản, dễ phối cùng áo sơ mi, quần âu hoặc kaki, phù hợp cho môi trường làm việc trong mùa lạnh.','2024-12-27 23:40:22',3),(50,'Áo len nam Vitimex ALN9006',212000.00,'\nÁo len công sở nam là trang phục ấm áp, lịch sự, thường có thiết kế cổ tròn hoặc cổ chữ V. Chất liệu len mềm mại, co giãn tốt, mang lại cảm giác thoải mái và giữ ấm hiệu quả. Màu sắc thường trơn hoặc có họa tiết tối giản, dễ phối cùng áo sơ mi, quần âu hoặc kaki, phù hợp cho môi trường làm việc trong mùa lạnh.','2024-12-26 23:45:57',3),(51,'Quần âu dáng ôm Vitimex QSK7526',415000.00,'\nQuần âu công sở nam là trang phục lịch sự, dáng suông hoặc ôm nhẹ, với thiết kế lưng cao hoặc trung, có ly hoặc không ly. Chất liệu thường là vải kaki, polyester, hoặc wool, mang lại cảm giác thoải mái và chuyên nghiệp. Màu sắc phổ biến là đen, xám, xanh đậm, dễ phối với áo sơ mi, vest, hoặc giày tây, phù hợp cho môi trường làm việc và sự kiện trang trọng.','2024-12-26 23:47:10',4),(52,'Quần âu dáng rộng Vitimex QKK9085',645000.00,'\nQuần âu công sở nam là trang phục lịch sự, dáng suông hoặc ôm nhẹ, với thiết kế lưng cao hoặc trung, có ly hoặc không ly. Chất liệu thường là vải kaki, polyester, hoặc wool, mang lại cảm giác thoải mái và chuyên nghiệp. Màu sắc phổ biến là đen, xám, xanh đậm, dễ phối với áo sơ mi, vest, hoặc giày tây, phù hợp cho môi trường làm việc và sự kiện trang trọng.','2024-12-26 23:48:45',4),(53,'Quần âu dáng rộng Vitimex QKK9053',272500.00,'\nQuần âu công sở nam là trang phục lịch sự, dáng suông hoặc ôm nhẹ, với thiết kế lưng cao hoặc trung, có ly hoặc không ly. Chất liệu thường là vải kaki, polyester, hoặc wool, mang lại cảm giác thoải mái và chuyên nghiệp. Màu sắc phổ biến là đen, xám, xanh đậm, dễ phối với áo sơ mi, vest, hoặc giày tây, phù hợp cho môi trường làm việc và sự kiện trang trọng.','2024-12-26 23:49:07',4),(54,'Quần âu dáng ôm Vitimex QSK9071',545000.00,'\nQuần âu công sở nam là trang phục lịch sự, dáng suông hoặc ôm nhẹ, với thiết kế lưng cao hoặc trung, có ly hoặc không ly. Chất liệu thường là vải kaki, polyester, hoặc wool, mang lại cảm giác thoải mái và chuyên nghiệp. Màu sắc phổ biến là đen, xám, xanh đậm, dễ phối với áo sơ mi, vest, hoặc giày tây, phù hợp cho môi trường làm việc và sự kiện trang trọng.','2024-12-26 23:49:23',4),(55,'Quần âu có ly Vitimex QLK9127',645000.00,'\nQuần âu công sở nam là trang phục lịch sự, dáng suông hoặc ôm nhẹ, với thiết kế lưng cao hoặc trung, có ly hoặc không ly. Chất liệu thường là vải kaki, polyester, hoặc wool, mang lại cảm giác thoải mái và chuyên nghiệp. Màu sắc phổ biến là đen, xám, xanh đậm, dễ phối với áo sơ mi, vest, hoặc giày tây, phù hợp cho môi trường làm việc và sự kiện trang trọng.','2024-12-26 23:49:38',4),(56,'Quần Jean nam Vitimex QJN4002',299500.00,'Quần jean công sở nam là loại quần được thiết kế với kiểu dáng lịch sự, tinh tế nhưng vẫn giữ được sự thoải mái của quần jean thông thường. Chúng thường có màu sắc trung tính như xanh đen, xám hoặc đen, dễ phối hợp với áo sơ mi hoặc áo vest, phù hợp cho môi trường làm việc công sở. Quần có form dáng ôm vừa phải, không quá rộng cũng không quá chật, giúp người mặc trông gọn gàng và chuyên nghiệp.','2024-12-26 23:51:20',5),(57,'Quần Jean nam Vitimex QJN4001',590000.00,'Quần jean công sở nam là loại quần được thiết kế với kiểu dáng lịch sự, tinh tế nhưng vẫn giữ được sự thoải mái của quần jean thông thường. Chúng thường có màu sắc trung tính như xanh đen, xám hoặc đen, dễ phối hợp với áo sơ mi hoặc áo vest, phù hợp cho môi trường làm việc công sở. Quần có form dáng ôm vừa phải, không quá rộng cũng không quá chật, giúp người mặc trông gọn gàng và chuyên nghiệp.','2024-12-26 23:51:36',5),(58,'Quần kaki Vitimex KSS7618',625000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:52:15',2),(59,'Quần kaki dáng ôm Vitimex KSG7617',625000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:52:28',2),(60,'Quần kaki dáng ôm Vitimex KSG7606',620000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:52:39',2),(61,'Quần kaki dáng rộng Vitimex KRG7615',312500.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:52:53',2),(62,'Quần kaki dáng ôm Vitimex KSS4008',625000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:53:07',2),(63,'Quần kaki dáng rộng Vitimex KRS4006',625000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:53:18',2),(64,'Quần kaki có ly Vitimex KCG4004',625000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:53:31',2),(65,'Quần kaki dáng rộng Vitimex KRG7493',625000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:53:54',2),(66,'Quần kaki dáng rộng Vitimex KRS7606',625000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:54:48',2),(67,'Quần kaki dáng ôm Vitimex KSS7619',625000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:55:22',2),(68,'Quần kaki dáng ôm Vitimex KSS7617',625000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:55:37',2),(69,'Quần kaki dáng rộng Vitimex KRS7644',625000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:55:51',2),(70,'Quần kaki dáng rộng Vitimex KRS7635',620000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:56:03',2),(71,'Quần kaki dáng rộng Vitimex KRS7627',650000.00,'Quần kaki công sở nam là loại quần được làm từ chất liệu vải kaki mềm mại, co giãn nhẹ, mang đến sự thoải mái và dễ chịu khi mặc. Với thiết kế lịch sự, phẳng phiu, quần kaki thường có màu sắc trung tính như xám, đen, be hoặc nâu, phù hợp với môi trường công sở. Quần có form dáng ôm nhẹ, tạo vẻ ngoài gọn gàng và chuyên nghiệp, dễ dàng kết hợp với áo sơ mi hoặc áo vest.','2024-12-26 23:56:15',2),(72,'Quần short dáng ôm Vitimex SSG9050',300000.00,'Kiểu dáng: Form Slim Fit ôm gọn, tôn dáng.\nThiết kế:Quần short trơn basic dễ mặc, dễ phối đồ.\nƯu điểm nổi trội: Thoáng khí, thấm hút mồ hôi tốt, đứng form, co dãn nhẹ','2024-12-27 23:36:04',7),(73,'Quần short dáng ôm Vitimex SSG9063',375000.00,'Kiểu dáng: Form Slim Fit ôm gọn, tôn dáng.\nThiết kế:Quần short trơn basic dễ mặc, dễ phối đồ.\nƯu điểm nổi trội: Thoáng khí, thấm hút mồ hôi tốt, đứng form, co dãn nhẹ','2024-12-26 23:56:44',7),(74,'Giày da nam công sở đen cao cấp (GD95)',380000.00,'Kiểu giày đơn giản nhưng vô cùng lịch lãm và tinh tế được các chàng trai công sở vô cùng ưa chuộng.','2024-12-26 23:56:58',8),(75,'Giày oxford nam mũi tròn chính hãng(GVN05)',500000.00,'Giày oxford nam mũi tròn chính hãng trẻ trung thanh lịch GVN05.Hàng chính hãng cao cấp','2024-12-26 23:57:09',8),(76,'Giày da nam công sở chất lượng tốt giá rẻ (GNK29)',295000.00,'Với mức giá \"hạt dẻ\" bạn có thể rinh về cho mình một đôi giày da ưng ý mà không phải lăn tăn về giá cả. Giày có hai màu đen-nâu, chất liệu da bóng nam tính cuốn hút người nhìn.','2024-12-26 23:57:18',8),(77,'Giày công sở nam loafer dập vân (GNK138)',440000.00,'Giày công sở nam loafer dập vân ấn tượng nam tính GNK138 là mẫu giày nam cao cấp thuộc dòng giày loafer nam có kiểu dáng cực kỳ thanh lịch, nam tính đang làm mưa làm gió trên thị trường giày nam thời điểm hiện tại.','2024-12-26 23:57:35',8),(78,'Giày da nam Hàn Quốc đục lỗ thoáng khí (GNK133)',459000.00,'Giày da nam Hàn Quốc đục lỗ thoáng khí lịch lãm GNK133 là mẫu giày nam cao cấp thuộc dòng giày oxford nam có kiểu dáng cực kỳ lịch lãm, thanh lịch đang làm mưa làm gió trên thị trường giày nam thời điểm hiện tại','2024-12-26 23:57:45',8),(79,'Giày nam bóng da bò thật thời thượng quý phái (GOD05)',1500000.00,'Giày tây nam bóng da bò thật thời thượng quý phái GOD05 đang là mẫu giày \'\'chảnh\'\' nhất. Vẫn là mẫu giày da buộc dây truyền thống nhưng từ kiểu cách đến chất da cho tới cách thiết kế thật khó để người nhìn không thể không để mắt tới.','2024-12-26 23:57:54',8),(80,'Giày da nam da bò thật classic lịch lãm (GOD06)',1000000.00,'Giày da nam da bò thật classic lịch lãm GOD06 đang là một trào lưu mới trong giới giày da thu đông năm nay. Không còn là kiểu giày tây bóng loáng hiện đại, xu hướng năm nay là mẫu giày da phong cách cổ điển vintage. ','2024-12-26 23:58:03',8),(81,'Giày lười nam da bò thật hàng hiệu sành điệu (GOD03)',999000.00,'Giày lười nam da bò thật hàng hiệu cao cấp GOD03 mang một vẻ đẹp trẻ trung phóng khoáng. Có thể do tính chất của mẫu giày lười đã mang đến cho người đi cái nhìn về sự thoải mái, hiện đại, trẻ trung; lại cộng thêm sự phối màu ăn ý của họa tiết trên giày là hai màu cực lì nổi bật xanh - đỏ càng khiến đôi giày ấn tượng hơn bao giờ hết. ','2024-12-26 23:58:14',8),(82,'Giày tây nam hai vân đen bóng phong độ (GD43)',330000.00,'Giày tây nam hai vân đen bóng phong độ GD43 là mẫu giày mang một vẻ ngoài sang trọng mạnh mẽ. Được phủ bên ngoài là lớp da bóng kết hợp hai vân trên phần mũi giày giúp đôi giày thêm ấn tượng. Khác vớí những mẫu giày trơn lì một loại da, giày được thiết kế hai loại lì-bóng phối hợp ăn ý làm nên một mẫu giày tinh tế hoàn hảo.','2024-12-26 23:58:23',8);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int DEFAULT NULL,
  `SizeID` int DEFAULT NULL,
  `Stars` int DEFAULT NULL,
  `Review` varchar(255) DEFAULT NULL,
  `Date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `FK_Rating_Orders` (`OrderID`),
  KEY `FK_Rating_SizeID` (`SizeID`),
  CONSTRAINT `FK_Rating_Orders` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Rating_Size` FOREIGN KEY (`SizeID`) REFERENCES `size` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `rating_chk_1` CHECK ((`Stars` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN'),(2,'STAFF'),(3,'USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippingmethods`
--

DROP TABLE IF EXISTS `shippingmethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippingmethods` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `MethodName` varchar(100) DEFAULT NULL,
  `Fee` decimal(10,2) DEFAULT NULL,
  `EstimatedDeliveryTime` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippingmethods`
--

LOCK TABLES `shippingmethods` WRITE;
/*!40000 ALTER TABLE `shippingmethods` DISABLE KEYS */;
INSERT INTO `shippingmethods` VALUES (1,'Giao hàng tiêu chuẩn',25000.00,'nhận hàng sau 3 - 5 ngày'),(2,'Giao hàng nhanh',35000.00,'nhận hàng sau 1 -3 ngày');
/*!40000 ALTER TABLE `shippingmethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ProductID` int DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Quantity_In_Stock` int DEFAULT NULL,
  `ColorID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_Size_Products` (`ProductID`),
  KEY `FK_Size_Color` (`ColorID`),
  CONSTRAINT `FK_Size_Color` FOREIGN KEY (`ColorID`) REFERENCES `color` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Size_Products` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=949 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (273,25,'M',20,21),(274,25,'L',20,21),(275,25,'XL',20,21),(569,3,'M',20,12),(570,3,'L',20,12),(571,3,'XL',20,12),(572,4,'M',20,13),(573,4,'L',20,13),(574,4,'XL',20,13),(575,5,'M',20,13),(576,5,'L',20,13),(577,5,'XL',20,13),(581,7,'M',20,14),(582,7,'L',20,14),(583,7,'XL',20,14),(584,8,'M',20,15),(585,8,'L',20,15),(586,8,'XL',20,15),(587,9,'M',20,16),(588,9,'L',20,16),(589,9,'XL',20,16),(590,10,'M',20,17),(591,10,'L',20,17),(592,10,'XL',20,17),(593,11,'M',20,18),(594,11,'L',19,18),(595,11,'XL',20,18),(596,12,'M',20,19),(597,12,'L',20,19),(598,12,'XL',20,19),(599,13,'M',20,20),(600,13,'L',20,20),(601,13,'XL',20,20),(602,15,'M',20,22),(603,15,'L',20,22),(604,15,'XL',20,22),(605,14,'M',20,21),(606,14,'L',20,21),(607,14,'XL',20,21),(608,16,'M',20,22),(609,16,'L',20,22),(610,16,'XL',20,22),(611,17,'M',20,23),(612,17,'L',20,23),(613,17,'XL',20,23),(614,18,'M',20,24),(615,18,'L',20,24),(616,18,'XL',20,24),(617,19,'M',20,21),(618,19,'L',20,21),(619,19,'XL',20,21),(620,20,'M',20,25),(621,20,'L',20,25),(622,20,'XL',20,25),(623,21,'M',20,26),(624,21,'L',20,26),(625,21,'XL',20,26),(626,22,'M',20,27),(627,22,'L',20,27),(628,22,'XL',20,27),(629,23,'M',20,28),(630,23,'L',20,28),(631,23,'XL',20,28),(632,24,'M',20,29),(633,24,'L',20,29),(634,24,'XL',20,29),(635,26,'M',20,30),(636,26,'L',20,30),(637,26,'XL',20,30),(641,28,'M',20,21),(642,28,'L',20,21),(643,28,'XL',20,21),(647,27,'M',20,21),(648,27,'L',20,21),(649,27,'XL',20,21),(650,29,'M',20,31),(651,29,'L',20,31),(652,29,'XL',20,31),(653,30,'M',20,21),(654,30,'L',20,21),(655,30,'XL',20,21),(656,31,'M',20,21),(657,31,'L',20,21),(658,31,'XL',20,21),(659,32,'M',20,21),(660,32,'L',20,21),(661,32,'XL',20,21),(662,33,'M',20,32),(663,33,'L',20,32),(664,33,'XL',20,32),(665,34,'M',20,33),(666,34,'L',20,33),(667,34,'XL',20,33),(668,36,'M',20,21),(669,36,'L',20,21),(670,36,'XL',20,21),(671,37,'M',20,21),(672,37,'L',20,21),(673,37,'XL',20,21),(674,38,'M',20,34),(675,38,'L',20,34),(676,38,'XL',20,34),(677,39,'M',20,21),(678,39,'L',20,21),(679,39,'XL',20,21),(680,40,'M',20,21),(681,40,'L',20,21),(682,40,'XL',20,21),(683,42,'M',20,21),(684,42,'L',20,21),(685,42,'XL',20,21),(686,43,'M',20,35),(687,43,'L',20,35),(688,43,'XL',20,35),(689,44,'M',20,7),(690,44,'L',20,7),(697,45,'M',20,36),(698,45,'L',20,36),(699,45,'XL',20,36),(700,46,'M',20,37),(701,46,'L',20,37),(702,46,'XL',20,37),(703,47,'M',20,38),(704,47,'L',20,38),(705,47,'XL',20,38),(706,48,'M',20,7),(707,48,'L',20,7),(708,48,'XL',20,7),(712,50,'M',20,7),(713,50,'L',20,7),(714,50,'XL',20,7),(715,51,'28',20,40),(716,51,'29',20,40),(717,51,'30',20,40),(718,51,'31',20,40),(719,51,'32',20,40),(720,51,'33',20,40),(721,52,'28',20,7),(722,52,'29',20,7),(723,52,'30',20,7),(724,52,'31',20,7),(725,52,'32',20,7),(726,52,'33',20,7),(727,53,'28',20,7),(728,53,'29',20,7),(729,53,'30',19,7),(730,53,'31',20,7),(731,53,'32',20,7),(732,53,'33',20,7),(733,54,'28',20,41),(734,54,'29',20,41),(735,54,'30',20,41),(736,54,'31',20,41),(737,54,'32',20,41),(738,54,'33',20,41),(739,55,'28',20,7),(740,55,'29',20,7),(741,55,'30',20,7),(742,55,'31',20,7),(743,55,'32',20,7),(744,55,'33',20,7),(745,56,'28',20,43),(746,56,'29',20,43),(747,56,'30',19,43),(748,56,'31',20,43),(749,56,'32',20,43),(750,56,'33',20,43),(751,57,'28',20,43),(752,57,'29',20,43),(753,57,'30',20,43),(754,57,'31',20,43),(755,57,'32',20,43),(756,57,'33',20,43),(757,58,'28',20,7),(758,58,'29',20,7),(759,58,'30',20,7),(760,58,'31',20,7),(761,58,'32',20,7),(762,58,'33',20,7),(763,59,'28',20,44),(764,59,'29',20,44),(765,59,'30',20,44),(766,59,'31',20,44),(767,59,'32',20,44),(768,59,'33',20,44),(769,60,'28',20,45),(770,60,'29',20,45),(771,60,'30',20,45),(772,60,'31',20,45),(773,60,'32',20,45),(774,60,'33',20,45),(775,61,'28',20,46),(776,61,'29',20,46),(777,61,'30',20,46),(778,61,'31',20,46),(779,61,'32',20,46),(780,61,'33',20,46),(781,62,'28',20,47),(782,62,'29',20,47),(783,62,'30',20,47),(784,62,'31',20,47),(785,62,'32',20,47),(786,62,'33',20,47),(787,63,'28',20,7),(788,63,'29',20,7),(789,63,'30',20,7),(790,63,'31',20,7),(791,63,'32',20,7),(792,63,'33',20,7),(793,64,'28',20,48),(794,64,'29',20,48),(795,64,'30',20,48),(796,64,'31',20,48),(797,64,'32',20,48),(798,64,'33',20,48),(799,65,'28',20,49),(800,65,'29',20,49),(801,65,'30',20,49),(802,65,'31',20,49),(803,65,'32',20,49),(804,65,'33',20,49),(805,66,'28',20,50),(806,66,'29',20,50),(807,66,'30',20,50),(808,66,'31',20,50),(809,66,'32',20,50),(810,66,'33',20,50),(811,67,'28',20,7),(812,67,'29',20,7),(813,67,'30',20,7),(814,67,'31',20,7),(815,67,'32',20,7),(816,67,'33',20,7),(817,68,'28',20,51),(818,68,'29',20,51),(819,68,'30',20,51),(820,68,'31',20,51),(821,68,'32',20,51),(822,68,'33',20,51),(823,69,'28',20,52),(824,69,'29',20,52),(825,69,'30',20,52),(826,69,'31',20,52),(827,69,'32',20,52),(828,69,'33',20,52),(829,70,'28',20,53),(830,70,'29',20,53),(831,70,'30',20,53),(832,70,'31',20,53),(833,70,'32',20,53),(834,70,'33',20,53),(835,71,'28',20,35),(836,71,'29',20,35),(837,71,'30',20,35),(838,71,'31',20,35),(839,71,'32',20,35),(840,71,'33',20,35),(847,73,'28',20,55),(848,73,'29',20,55),(849,73,'30',20,55),(850,73,'31',20,55),(851,73,'32',20,55),(852,73,'33',20,55),(859,74,'38',20,7),(860,74,'39',20,7),(861,74,'40',20,7),(862,74,'41',20,7),(863,74,'42',20,7),(864,74,'43',20,7),(865,74,'44',20,7),(866,75,'38',20,56),(867,75,'39',20,56),(868,75,'40',20,56),(869,75,'41',20,56),(870,75,'42',20,56),(871,75,'43',20,56),(872,75,'44',20,56),(873,76,'38',20,7),(874,76,'39',20,7),(875,76,'40',20,7),(876,76,'41',20,7),(877,76,'42',19,7),(878,76,'43',20,7),(879,76,'44',20,7),(880,77,'38',20,7),(881,77,'39',20,7),(882,77,'40',20,7),(883,77,'41',20,7),(884,77,'42',20,7),(885,77,'43',20,7),(886,77,'44',20,7),(887,78,'38',20,7),(888,78,'39',20,7),(889,78,'40',20,7),(890,78,'41',20,7),(891,78,'42',20,7),(892,78,'43',20,7),(893,78,'44',20,7),(894,79,'38',20,57),(895,79,'39',20,57),(896,79,'40',20,57),(897,79,'41',20,57),(898,79,'42',20,57),(899,79,'43',20,57),(900,79,'44',20,57),(901,80,'38',20,58),(902,80,'39',20,58),(903,80,'40',20,58),(904,80,'41',20,58),(905,80,'42',20,58),(906,80,'43',20,58),(907,80,'44',20,58),(908,81,'38',20,7),(909,81,'39',20,7),(910,81,'40',20,7),(911,81,'41',20,7),(912,81,'42',20,7),(913,81,'43',20,7),(914,81,'44',20,7),(915,82,'38',20,7),(916,82,'39',20,7),(917,82,'40',20,7),(918,82,'41',20,7),(919,82,'42',20,7),(920,82,'43',20,7),(921,82,'44',20,7),(934,6,'M',20,13),(935,6,'L',20,13),(936,6,'XL',20,13),(937,1,'M',15,8),(938,1,'L',15,8),(939,1,'XL',15,8),(940,72,'28',20,54),(941,72,'29',18,54),(942,72,'30',20,54),(943,72,'31',20,54),(944,72,'32',20,54),(945,72,'33',20,54),(946,49,'M',20,39),(947,49,'L',19,39),(948,49,'XL',20,39);
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-28 21:57:45
