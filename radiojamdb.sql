-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: radiojamdb
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

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
-- Table structure for table `amigos`
--

DROP TABLE IF EXISTS `amigos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amigos` (
  `IdAmigos` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `IdUsuarioAmigo` int(11) NOT NULL,
  `Estado` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`IdAmigos`),
  KEY `Username` (`Username`),
  KEY `IdUsuarioAmigo` (`IdUsuarioAmigo`),
  CONSTRAINT `amigos_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `usuarios` (`Username`),
  CONSTRAINT `amigos_ibfk_2` FOREIGN KEY (`IdUsuarioAmigo`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amigos`
--

LOCK TABLES `amigos` WRITE;
/*!40000 ALTER TABLE `amigos` DISABLE KEYS */;
INSERT INTO `amigos` VALUES (2,'Gael Razo',3,'Aceptado');
/*!40000 ALTER TABLE `amigos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciudades` (
  `IdCiudad` int(11) NOT NULL AUTO_INCREMENT,
  `IdPais` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Latitud` decimal(10,7) DEFAULT NULL,
  `Longitud` decimal(10,7) DEFAULT NULL,
  PRIMARY KEY (`IdCiudad`),
  KEY `IdPais` (`IdPais`),
  CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`IdPais`) REFERENCES `pais` (`IdPais`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (1,1,'Internacional',NULL,NULL),(2,2,'Internacional',NULL,NULL),(3,3,'Internacional',NULL,NULL);
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estaciones`
--

DROP TABLE IF EXISTS `estaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estaciones` (
  `IdEstacion` int(11) NOT NULL AUTO_INCREMENT,
  `IdCiudad` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Stream_url` varchar(255) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `Genero` varchar(50) DEFAULT NULL,
  `VVID_API` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IdEstacion`),
  KEY `IdCiudad` (`IdCiudad`),
  CONSTRAINT `estaciones_ibfk_1` FOREIGN KEY (`IdCiudad`) REFERENCES `ciudades` (`IdCiudad`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estaciones`
--

LOCK TABLES `estaciones` WRITE;
/*!40000 ALTER TABLE `estaciones` DISABLE KEYS */;
INSERT INTO `estaciones` VALUES (1,1,'Los 40 Principales México','http://27063.live.streamtheworld.com/LOS40_MEXICO_SC',NULL,'Radio',NULL),(2,2,'Antena 1 São Paulo, SP (ZYD823 94,7 MHz FM) [aac]','http://antena1.newradio.it/stream?ext=.mp3',NULL,'Radio',NULL),(3,3,'Europa Plus','http://ep256.hostingradio.ru:8052/europaplus256.mp3',NULL,'Radio',NULL),(4,1,'Radio Paradise Main Mix (EU) 320k AAC','http://stream-uk1.radioparadise.com/aac-320',NULL,'Jam',NULL),(5,1,'SABROSITA Ciudad de México - 590 AM - XEPH-AM - NRM Comunicaciones - Ciudad de México','https://playerservices.streamtheworld.com/api/livestream-redirect/XEPHAMAAC.aac',NULL,'Jam',NULL),(6,1,'ABC NewsRadio MP3','http://abc.streamguys1.com/live/newsradio/icecast.audio',NULL,'Jam',NULL),(7,1,'Café Romántico Radio (Monterrey) - Online - www.caferomanticoradio.com - Grupo Digital Radioland - M','https://panel.retrolandigital.com/radio/8110/listen',NULL,'Radio',NULL),(8,1,'BEAUTIFUL Instrumentals','http://s3.voscast.com:10038/',NULL,'Radio',NULL),(9,1,'Cumbias Inmortales Radio (Monterrey) - Online - www.cumbiasinmortales.com - Grupo Digital Retroland ','https://panel.retrolandigital.com/listen/cumbias_inmortales_radio/listen',NULL,'Radio',NULL),(10,1,'Classic Vinyl HD','https://icecast.walmradio.com:8443/classic',NULL,'Radio',NULL),(11,1,'华语金曲500首','http://ls.qingting.fm/live/3412131.m3u8?bitrate=64',NULL,'Radio',NULL),(12,1,'CCTV-13新闻伴音','https://piccpndali.v.myalicdn.com/audio/cctv13_2.m3u8',NULL,'Radio',NULL),(13,1,'Hits 1 Algérie','https://radio12.pro-fhi.net/listen/whmnrlow/stream',NULL,'Radio',NULL),(14,1,'إذاعة القرآن الكريم ','http://stream.radiojar.com/0tpy1h0kxtzuv',NULL,'Radio',NULL),(15,1,'La Mejor Ciudad de México - 97.7 FM - XERC-FM - MVS Radio - Ciudad de México','https://playerservices.streamtheworld.com/api/livestream-redirect/XERCFM_SC',NULL,'Radio',NULL),(16,1,'Radio Fórmula - 104.1 FM - XERFR-FM - Grupo Fórmula - Ciudad de México','https://mdstrm.com/audio/61e1dfd2658baf082814e25d/live.m3u8',NULL,'Radio',NULL),(17,1,'Jazz Sakura (asia dream radio)','http://kathy.torontocast.com:3330/stream/1/?esPlayer&cb=82181.mp3',NULL,'Radio',NULL),(18,1,'Anime Para Ti','https://stream.zeno.fm/qpn8mkt8c4duv',NULL,'Radio',NULL),(19,1,'France Info','http://direct.franceinfo.fr/live/franceinfo-midfi.mp3',NULL,'Radio',NULL),(20,1,'RFI Afrique','http://live02.rfi.fr/rfiafrique-64.mp3',NULL,'Radio',NULL),(21,1,'RFI Monde','http://live02.rfi.fr/rfimonde-64.mp3',NULL,'Radio',NULL),(22,1,'Radio Sarcheshme','http://sarcheshmeh.icdndhcp.com:18452/stream',NULL,'Radio',NULL),(23,1,'RTL','http://streaming.radio.rtl.fr/rtl-1-44-128',NULL,'Radio',NULL),(24,1,'iraninternational','https://radio.iraninternational.app/iintl_c',NULL,'Radio',NULL),(25,1,'.977 Country','http://26343.live.streamtheworld.com/977_COUNTRY_SC',NULL,'Radio',NULL),(26,1,'101 SMOOTH JAZZ','http://jking.cdnstream1.com/b22139_128mp3',NULL,'Radio',NULL),(27,1,'RMC FR','https://audio.bfmtv.com/rmcradio_128.mp3',NULL,'Radio',NULL),(28,1,'France Inter','http://direct.franceinter.fr/live/franceinter-midfi.mp3',NULL,'Radio',NULL),(29,1,'Ретро FM 70e','http://retro70.hostingradio.ru:8025/retro70-128.mp3',NULL,'Radio',NULL),(30,1,'La Ranchera de Monterrey - 1050 AM - XEG-AM - Núcleo Radio Monterrey - Monterrey, NL','http://streamingcwsradio20.com:9410/stream',NULL,'Radio',NULL),(31,1,'88.9 Noticias - 88.9 FM - XHM-FM - Grupo ACIR - Ciudad de México','https://playerservices.streamtheworld.com/api/livestream-redirect/XHMFMAAC_SC.aac',NULL,'Radio',NULL),(32,1,'Panda Show Radio - Online - El Panda Zambrano - Ciudad de México','http://65.21.202.84:8062/',NULL,'Radio',NULL),(33,1,'La Z Ciudad de México - 107.3 FM - XEQR-FM - Grupo Radio Centro - Ciudad de México','https://playerservices.streamtheworld.com/api/livestream-redirect/XEQR_FMAAC.aac',NULL,'Radio',NULL),(34,1,'Amor Ciudad de México - 95.3 FM - XHSH-FM - Grupo ACIR - Ciudad de México','https://27143.live.streamtheworld.com:443/XHSHFMAAC.aac',NULL,'Radio',NULL),(35,1,'ROCK FM','http://nashe1.hostingradio.ru/rock-128.mp3',NULL,'Radio',NULL),(36,1,'Adroit Jazz Underground','https://icecast.walmradio.com:8443/jazz',NULL,'Radio',NULL),(37,1,'La Comadre Ciudad de México - 1260 AM - XEL-AM - Grupo ACIR - Ciudad de México','https://playerservices.streamtheworld.com/api/livestream-redirect/XELAMAAC.aac',NULL,'Radio',NULL),(38,1,'Christmas Vinyl HD','https://icecast.walmradio.com:8443/christmas',NULL,'Radio',NULL),(39,1,'Adroit Jazz Underground HD Opus','https://icecast.walmradio.com:8443/jazz_opus',NULL,'Radio',NULL),(40,1,'.977 Hitz','http://18863.live.streamtheworld.com/977_HITS_SC',NULL,'Radio',NULL),(41,1,'Radio Okapi','http://rs1.radiostreamer.com:8000/;',NULL,'Radio',NULL),(42,1,'Deep House Lounge','http://198.15.94.34:8006/stream',NULL,'Radio',NULL),(43,1,'WALM HD','https://icecast.walmradio.com:8443/walm',NULL,'Radio',NULL),(44,1,'Oldies Internet Radio','http://162.244.81.98:8140/listen',NULL,'Radio',NULL),(45,1,'La Ke Buena Ciudad de México - 92.9 FM - XEQ-FM - Radiópolis - Ciudad de México','https://playerservices.streamtheworld.com/api/livestream-redirect/KEBUENAAAC.aac',NULL,'Radio',NULL),(46,1,'W Radio Ciudad de México (XEW-AM 900 kHz, XEW-FM 96.9 MHz) Televisa Radio','http://19293.live.streamtheworld.com:3690/W_RADIOAAC_SC',NULL,'Radio',NULL);
/*!40000 ALTER TABLE `estaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favoritos` (
  `IdFavorito` int(11) NOT NULL AUTO_INCREMENT,
  `IdUsuario` int(11) NOT NULL,
  `IdEstacion` int(11) NOT NULL,
  `FechaAgregado` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`IdFavorito`),
  KEY `IdUsuario` (`IdUsuario`),
  KEY `IdEstacion` (`IdEstacion`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`),
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`IdEstacion`) REFERENCES `estaciones` (`IdEstacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
INSERT INTO `favoritos` VALUES (1,1,1,'2026-04-14 22:43:51'),(2,1,2,'2026-04-14 22:44:06'),(3,1,3,'2026-04-15 09:12:07');
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial` (
  `IdHistorial` int(11) NOT NULL AUTO_INCREMENT,
  `IdUsuario` int(11) NOT NULL,
  `IdEstacion` int(11) NOT NULL,
  `FechaEscucha` datetime DEFAULT current_timestamp(),
  `DuracionSegundos` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdHistorial`),
  KEY `IdUsuario` (`IdUsuario`),
  KEY `IdEstacion` (`IdEstacion`),
  CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`),
  CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`IdEstacion`) REFERENCES `estaciones` (`IdEstacion`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial`
--

LOCK TABLES `historial` WRITE;
/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
INSERT INTO `historial` VALUES (5,1,12,'2026-04-29 23:21:31',NULL),(10,3,15,'2026-04-29 23:39:25',NULL),(11,3,16,'2026-04-29 23:39:31',NULL),(14,3,18,'2026-04-30 00:07:51',NULL),(15,3,19,'2026-04-30 00:10:26',NULL),(16,3,20,'2026-04-30 00:10:28',NULL),(19,1,21,'2026-04-30 00:18:00',NULL),(20,1,22,'2026-04-30 00:18:14',NULL),(21,3,3,'2026-04-30 00:25:03',NULL),(22,3,13,'2026-04-30 00:39:07',NULL),(23,3,14,'2026-04-30 00:39:10',NULL),(24,1,2,'2026-04-30 00:52:29',NULL),(26,1,23,'2026-04-30 01:00:35',NULL),(27,1,24,'2026-04-30 01:00:38',NULL),(28,1,25,'2026-04-30 01:00:41',NULL),(31,1,27,'2026-04-30 01:04:35',NULL),(32,1,28,'2026-04-30 01:04:39',NULL),(33,1,29,'2026-04-30 01:04:44',NULL),(41,1,33,'2026-04-30 01:32:24',NULL),(43,3,7,'2026-04-30 01:34:36',NULL),(44,3,17,'2026-04-30 01:34:42',NULL),(45,3,4,'2026-04-30 01:35:45',NULL),(77,1,11,'2026-04-30 10:13:46',NULL),(87,1,3,'2026-04-30 10:23:39',NULL),(88,1,35,'2026-04-30 10:23:46',NULL),(97,1,37,'2026-04-30 10:24:42',NULL),(100,1,26,'2026-04-30 10:24:59',NULL),(102,1,40,'2026-04-30 10:25:08',NULL),(118,1,41,'2026-04-30 10:31:47',NULL),(124,1,4,'2026-04-30 10:33:54',NULL),(126,1,36,'2026-04-30 10:33:57',NULL),(127,1,42,'2026-04-30 10:34:02',NULL),(128,1,43,'2026-04-30 10:34:04',NULL),(129,1,38,'2026-04-30 10:34:05',NULL),(130,1,10,'2026-04-30 10:34:08',NULL),(131,1,39,'2026-04-30 10:34:13',NULL),(133,1,7,'2026-04-30 10:36:22',NULL),(134,1,8,'2026-04-30 10:36:25',NULL),(135,1,9,'2026-04-30 10:36:31',NULL),(136,1,30,'2026-04-30 10:36:33',NULL),(137,1,31,'2026-04-30 10:36:35',NULL),(138,1,5,'2026-04-30 10:36:38',NULL),(139,1,44,'2026-04-30 10:36:40',NULL),(140,1,34,'2026-04-30 10:36:43',NULL),(141,1,45,'2026-04-30 10:36:48',NULL),(142,1,46,'2026-04-30 10:36:52',NULL),(143,1,32,'2026-04-30 10:36:54',NULL),(146,1,1,'2026-04-30 10:47:42',NULL);
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitacionesjam`
--

DROP TABLE IF EXISTS `invitacionesjam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invitacionesjam` (
  `IdInvitacion` int(11) NOT NULL AUTO_INCREMENT,
  `IdJam` int(11) NOT NULL,
  `IdRemitente` int(11) NOT NULL,
  `IdDestinatario` int(11) NOT NULL,
  `Estado` varchar(20) DEFAULT 'Pendiente',
  `Fecha` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`IdInvitacion`),
  KEY `IdJam` (`IdJam`),
  KEY `IdRemitente` (`IdRemitente`),
  KEY `IdDestinatario` (`IdDestinatario`),
  CONSTRAINT `invitacionesjam_ibfk_1` FOREIGN KEY (`IdJam`) REFERENCES `jam` (`IdJam`),
  CONSTRAINT `invitacionesjam_ibfk_2` FOREIGN KEY (`IdRemitente`) REFERENCES `usuarios` (`IdUsuario`),
  CONSTRAINT `invitacionesjam_ibfk_3` FOREIGN KEY (`IdDestinatario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitacionesjam`
--

LOCK TABLES `invitacionesjam` WRITE;
/*!40000 ALTER TABLE `invitacionesjam` DISABLE KEYS */;
INSERT INTO `invitacionesjam` VALUES (1,1,1,3,'Aceptada','2026-04-30 10:37:41'),(2,2,1,3,'Aceptada','2026-04-30 10:43:52'),(3,3,1,3,'Aceptada','2026-04-30 10:47:55');
/*!40000 ALTER TABLE `invitacionesjam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jam`
--

DROP TABLE IF EXISTS `jam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jam` (
  `IdJam` int(11) NOT NULL AUTO_INCREMENT,
  `IdEstacion` int(11) NOT NULL,
  `IdCreador` int(11) NOT NULL,
  `Codigo` varchar(50) DEFAULT NULL,
  `Estado` varchar(20) DEFAULT NULL,
  `FechaInicio` datetime DEFAULT NULL,
  `FechaFin` datetime DEFAULT NULL,
  PRIMARY KEY (`IdJam`),
  UNIQUE KEY `Codigo` (`Codigo`),
  KEY `IdEstacion` (`IdEstacion`),
  KEY `IdCreador` (`IdCreador`),
  CONSTRAINT `jam_ibfk_1` FOREIGN KEY (`IdEstacion`) REFERENCES `estaciones` (`IdEstacion`),
  CONSTRAINT `jam_ibfk_2` FOREIGN KEY (`IdCreador`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jam`
--

LOCK TABLES `jam` WRITE;
/*!40000 ALTER TABLE `jam` DISABLE KEYS */;
INSERT INTO `jam` VALUES (3,1,1,'YMIJSQ','Terminada','2026-04-30 10:47:44','2026-04-30 10:48:20');
/*!40000 ALTER TABLE `jam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jamusuario`
--

DROP TABLE IF EXISTS `jamusuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jamusuario` (
  `IdJamUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `IdJam` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `FechaUnion` datetime DEFAULT current_timestamp(),
  `Rol` varchar(20) DEFAULT NULL,
  `UltimoHeartbeat` datetime DEFAULT NULL,
  PRIMARY KEY (`IdJamUsuario`),
  KEY `IdJam` (`IdJam`),
  KEY `IdUsuario` (`IdUsuario`),
  CONSTRAINT `jamusuario_ibfk_1` FOREIGN KEY (`IdJam`) REFERENCES `jam` (`IdJam`),
  CONSTRAINT `jamusuario_ibfk_2` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jamusuario`
--

LOCK TABLES `jamusuario` WRITE;
/*!40000 ALTER TABLE `jamusuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `jamusuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pais` (
  `IdPais` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `CodigoISO` varchar(10) NOT NULL,
  PRIMARY KEY (`IdPais`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'México','Mé'),(2,'Brasil','BRA'),(3,'Rusia','RUS');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`IdUsuario`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Correo` (`Correo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Gael Razo','galekrazom@gmail.com','$2y$10$nw1qy4tV0UTdqw2a0HLXj.YzTtMrD243AOIE1td6jZtB2ELcY333q'),(2,'Karla','karla@gmail.com','$2y$10$ZUoFNMtU5facR37hW8r5xuqJRbnCmLZlPenDBNesaaDnl1wspKTHu'),(3,'Arturo','Arturotest@gmail.com','$2y$10$AQUpF90g09.JxPOUsNqyGOWowDlUyL1FydXwedy3h5h/zfAARPccu');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-30 12:55:02
