-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 02-05-2026 a las 23:11:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `radiojamdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amigos`
--

CREATE TABLE `amigos` (
  `IdAmigos` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `IdUsuarioAmigo` int(11) NOT NULL,
  `Estado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `amigos`
--

INSERT INTO `amigos` (`IdAmigos`, `Username`, `IdUsuarioAmigo`, `Estado`) VALUES
(2, 'Gael Razo', 3, 'Aceptado'),
(3, 'sansan', 1, 'Aceptado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `IdCiudad` int(11) NOT NULL,
  `IdPais` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Latitud` decimal(10,7) DEFAULT NULL,
  `Longitud` decimal(10,7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`IdCiudad`, `IdPais`, `Nombre`, `Latitud`, `Longitud`) VALUES
(1, 1, 'Internacional', NULL, NULL),
(2, 2, 'Internacional', NULL, NULL),
(3, 3, 'Internacional', NULL, NULL),
(4, 4, 'Internacional', NULL, NULL),
(5, 5, 'Internacional', NULL, NULL),
(6, 6, 'Internacional', NULL, NULL),
(7, 7, 'Internacional', NULL, NULL),
(8, 8, 'Internacional', NULL, NULL),
(9, 9, 'Internacional', NULL, NULL),
(10, 10, 'Internacional', NULL, NULL),
(11, 11, 'Internacional', NULL, NULL),
(12, 12, 'Internacional', NULL, NULL),
(13, 13, 'Internacional', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estaciones`
--

CREATE TABLE `estaciones` (
  `IdEstacion` int(11) NOT NULL,
  `IdCiudad` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Stream_url` varchar(255) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `Genero` varchar(50) DEFAULT NULL,
  `VVID_API` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estaciones`
--

INSERT INTO `estaciones` (`IdEstacion`, `IdCiudad`, `Nombre`, `Stream_url`, `Descripcion`, `Genero`, `VVID_API`) VALUES
(1, 1, 'Los 40 Principales México', 'http://27063.live.streamtheworld.com/LOS40_MEXICO_SC', NULL, 'Radio', NULL),
(2, 2, 'Antena 1 São Paulo, SP (ZYD823 94,7 MHz FM) [aac]', 'http://antena1.newradio.it/stream?ext=.mp3', NULL, 'Radio', NULL),
(3, 3, 'Europa Plus', 'http://ep256.hostingradio.ru:8052/europaplus256.mp3', NULL, 'Radio', NULL),
(4, 1, 'Radio Paradise Main Mix (EU) 320k AAC', 'http://stream-uk1.radioparadise.com/aac-320', NULL, 'Jam', NULL),
(5, 1, 'SABROSITA Ciudad de México - 590 AM - XEPH-AM - NRM Comunicaciones - Ciudad de México', 'https://playerservices.streamtheworld.com/api/livestream-redirect/XEPHAMAAC.aac', NULL, 'Jam', NULL),
(6, 1, 'ABC NewsRadio MP3', 'http://abc.streamguys1.com/live/newsradio/icecast.audio', NULL, 'Jam', NULL),
(7, 1, 'Café Romántico Radio (Monterrey) - Online - www.caferomanticoradio.com - Grupo Digital Radioland - M', 'https://panel.retrolandigital.com/radio/8110/listen', NULL, 'Radio', NULL),
(8, 1, 'BEAUTIFUL Instrumentals', 'http://s3.voscast.com:10038/', NULL, 'Radio', NULL),
(9, 1, 'Cumbias Inmortales Radio (Monterrey) - Online - www.cumbiasinmortales.com - Grupo Digital Retroland ', 'https://panel.retrolandigital.com/listen/cumbias_inmortales_radio/listen', NULL, 'Radio', NULL),
(10, 1, 'Classic Vinyl HD', 'https://icecast.walmradio.com:8443/classic', NULL, 'Radio', NULL),
(11, 1, '华语金曲500首', 'http://ls.qingting.fm/live/3412131.m3u8?bitrate=64', NULL, 'Radio', NULL),
(12, 1, 'CCTV-13新闻伴音', 'https://piccpndali.v.myalicdn.com/audio/cctv13_2.m3u8', NULL, 'Radio', NULL),
(13, 1, 'Hits 1 Algérie', 'https://radio12.pro-fhi.net/listen/whmnrlow/stream', NULL, 'Radio', NULL),
(14, 1, 'إذاعة القرآن الكريم ', 'http://stream.radiojar.com/0tpy1h0kxtzuv', NULL, 'Radio', NULL),
(15, 1, 'La Mejor Ciudad de México - 97.7 FM - XERC-FM - MVS Radio - Ciudad de México', 'https://playerservices.streamtheworld.com/api/livestream-redirect/XERCFM_SC', NULL, 'Radio', NULL),
(16, 1, 'Radio Fórmula - 104.1 FM - XERFR-FM - Grupo Fórmula - Ciudad de México', 'https://mdstrm.com/audio/61e1dfd2658baf082814e25d/live.m3u8', NULL, 'Radio', NULL),
(17, 1, 'Jazz Sakura (asia dream radio)', 'http://kathy.torontocast.com:3330/stream/1/?esPlayer&cb=82181.mp3', NULL, 'Radio', NULL),
(18, 1, 'Anime Para Ti', 'https://stream.zeno.fm/qpn8mkt8c4duv', NULL, 'Radio', NULL),
(19, 1, 'France Info', 'http://direct.franceinfo.fr/live/franceinfo-midfi.mp3', NULL, 'Radio', NULL),
(20, 1, 'RFI Afrique', 'http://live02.rfi.fr/rfiafrique-64.mp3', NULL, 'Radio', NULL),
(21, 1, 'RFI Monde', 'http://live02.rfi.fr/rfimonde-64.mp3', NULL, 'Radio', NULL),
(22, 1, 'Radio Sarcheshme', 'http://sarcheshmeh.icdndhcp.com:18452/stream', NULL, 'Radio', NULL),
(23, 1, 'RTL', 'http://streaming.radio.rtl.fr/rtl-1-44-128', NULL, 'Radio', NULL),
(24, 1, 'iraninternational', 'https://radio.iraninternational.app/iintl_c', NULL, 'Radio', NULL),
(25, 1, '.977 Country', 'http://26343.live.streamtheworld.com/977_COUNTRY_SC', NULL, 'Radio', NULL),
(26, 1, '101 SMOOTH JAZZ', 'http://jking.cdnstream1.com/b22139_128mp3', NULL, 'Radio', NULL),
(27, 1, 'RMC FR', 'https://audio.bfmtv.com/rmcradio_128.mp3', NULL, 'Radio', NULL),
(28, 1, 'France Inter', 'http://direct.franceinter.fr/live/franceinter-midfi.mp3', NULL, 'Radio', NULL),
(29, 1, 'Ретро FM 70e', 'http://retro70.hostingradio.ru:8025/retro70-128.mp3', NULL, 'Radio', NULL),
(30, 1, 'La Ranchera de Monterrey - 1050 AM - XEG-AM - Núcleo Radio Monterrey - Monterrey, NL', 'http://streamingcwsradio20.com:9410/stream', NULL, 'Radio', NULL),
(31, 1, '88.9 Noticias - 88.9 FM - XHM-FM - Grupo ACIR - Ciudad de México', 'https://playerservices.streamtheworld.com/api/livestream-redirect/XHMFMAAC_SC.aac', NULL, 'Radio', NULL),
(32, 1, 'Panda Show Radio - Online - El Panda Zambrano - Ciudad de México', 'http://65.21.202.84:8062/', NULL, 'Radio', NULL),
(33, 1, 'La Z Ciudad de México - 107.3 FM - XEQR-FM - Grupo Radio Centro - Ciudad de México', 'https://playerservices.streamtheworld.com/api/livestream-redirect/XEQR_FMAAC.aac', NULL, 'Radio', NULL),
(34, 1, 'Amor Ciudad de México - 95.3 FM - XHSH-FM - Grupo ACIR - Ciudad de México', 'https://27143.live.streamtheworld.com:443/XHSHFMAAC.aac', NULL, 'Radio', NULL),
(35, 1, 'ROCK FM', 'http://nashe1.hostingradio.ru/rock-128.mp3', NULL, 'Radio', NULL),
(36, 1, 'Adroit Jazz Underground', 'https://icecast.walmradio.com:8443/jazz', NULL, 'Radio', NULL),
(37, 1, 'La Comadre Ciudad de México - 1260 AM - XEL-AM - Grupo ACIR - Ciudad de México', 'https://playerservices.streamtheworld.com/api/livestream-redirect/XELAMAAC.aac', NULL, 'Radio', NULL),
(38, 1, 'Christmas Vinyl HD', 'https://icecast.walmradio.com:8443/christmas', NULL, 'Radio', NULL),
(39, 1, 'Adroit Jazz Underground HD Opus', 'https://icecast.walmradio.com:8443/jazz_opus', NULL, 'Radio', NULL),
(40, 1, '.977 Hitz', 'http://18863.live.streamtheworld.com/977_HITS_SC', NULL, 'Radio', NULL),
(41, 1, 'Radio Okapi', 'http://rs1.radiostreamer.com:8000/;', NULL, 'Radio', NULL),
(42, 1, 'Deep House Lounge', 'http://198.15.94.34:8006/stream', NULL, 'Radio', NULL),
(43, 1, 'WALM HD', 'https://icecast.walmradio.com:8443/walm', NULL, 'Radio', NULL),
(44, 1, 'Oldies Internet Radio', 'http://162.244.81.98:8140/listen', NULL, 'Radio', NULL),
(45, 1, 'La Ke Buena Ciudad de México - 92.9 FM - XEQ-FM - Radiópolis - Ciudad de México', 'https://playerservices.streamtheworld.com/api/livestream-redirect/KEBUENAAAC.aac', NULL, 'Radio', NULL),
(46, 1, 'W Radio Ciudad de México (XEW-AM 900 kHz, XEW-FM 96.9 MHz) Televisa Radio', 'http://19293.live.streamtheworld.com:3690/W_RADIOAAC_SC', NULL, 'Radio', NULL),
(47, 1, 'Exclusively BTS', 'https://nl4.mystreaming.net/er/bts/icecast.audio', NULL, 'Radio', NULL),
(48, 1, 'France Culture', 'http://icecast.radiofrance.fr/franceculture-hifi.aac', NULL, 'Radio', NULL),
(49, 1, 'Classic FM UK', 'http://ice-the.musicradio.com/ClassicFMMP3', NULL, 'Radio', NULL),
(50, 1, 'DFM RUSSIAN DANCE', 'https://dfm-dfmrusdance.hostingradio.ru/dfmrusdance96.aacp?0.9987259013359274', NULL, 'Radio', NULL),
(51, 1, 'Classic Vinyl HD Opus', 'https://icecast.walmradio.com:8443/classic_opus', NULL, 'Radio', NULL),
(52, 1, 'Exclusively Coldplay', 'https://nl4.mystreaming.net/er/coldplay/icecast.audio', NULL, 'Radio', NULL),
(53, 1, '90s90s Hits', 'http://streams.90s90s.de/pop/mp3-192/streams.90s90s.de/', NULL, 'Radio', NULL),
(54, 1, 'XHRH-FM \"Amor 103.3\" Puebla, PU', 'http://27163.live.streamtheworld.com/XHRHFMAAC_SC', NULL, 'Radio', NULL),
(55, 1, 'Rock And Pop FM 95.9 (Rock & Pop) Ciudad de Buenos Aires', 'https://playerservices.streamtheworld.com/api/livestream-redirect/ROCKANDPOPAAC.aac', NULL, 'Radio', NULL),
(56, 1, 'Austrian Rock Radio', 'http://live.antenne.at/arr', NULL, 'Radio', NULL),
(57, 1, 'XHEXA \"Exa FM\" 104.9 FM Mexico City, DF', 'http://18213.live.streamtheworld.com/XHEXA_SC', NULL, 'Radio', NULL),
(58, 1, 'La Ke Buena Acayucan - 93.9 FM - XHEVZ-FM - Acayucan, VE', 'https://secure.radiorama.mx:2170/', NULL, 'Radio', NULL),
(59, 1, 'Nicaragua Reggae Radio.com', 'http://online.radiodifusion.net:8054/stream/1/', NULL, 'Radio', NULL),
(60, 1, 'Radio Vandalica Nicaragua', 'https://stream.zeno.fm/caq3fwn1fnruv', NULL, 'Radio', NULL),
(61, 1, 'Radio Estereo Música', 'http://stream.zeno.fm/8mwf6ssgtceuv', NULL, 'Radio', NULL),
(62, 1, 'Mirt Internet Radio', 'http://stream.zeno.fm/akmuznguawzuv', NULL, 'Radio', NULL),
(63, 1, 'Ethio FM 107.8', 'https://stream.zeno.fm/72y045deqeruv', NULL, 'Radio', NULL),
(64, 1, 'LOS 40 Principales España', 'https://playerservices.streamtheworld.com/api/livestream-redirect/Los40.mp3', NULL, 'Radio', NULL),
(65, 1, 'Qazaq radiosy', 'https://radio-streams.kaztrk.kz/qazradio/qazradio/icecast.audio', NULL, 'Radio', NULL),
(66, 1, 'Abdulbasit Abdulsamad', 'https://radio.mp3islam.com/listen/abdulbasit/radio.mp3', NULL, 'Radio', NULL),
(67, 1, 'Cadena 100', 'http://cadena100-streamers-mp3.flumotion.com/cope/cadena100.mp3', NULL, 'Radio', NULL),
(68, 1, 'Exa FM', 'https://playerservices.streamtheworld.com/api/livestream-redirect/XHPSFMAAC.aac', NULL, 'Radio', NULL),
(69, 1, 'LegendFM 101.1', 'https://27163.live.streamtheworld.com/PNGLEGENDFM.mp3', NULL, 'Radio', NULL),
(70, 1, 'CNN Indonesia TV', 'http://live.cnnindonesia.com/livecnn/smil:cnntv.smil/chunklist_w275412545_b384000_sleng.m3u8', NULL, 'Radio', NULL),
(71, 1, 'มิติข่าว 90.5', 'http://live3.smartbomb.co.th:8624/;stream.mp3', NULL, 'Radio', NULL),
(72, 1, 'fm addis 97.1', 'http://stream.zeno.fm/7tzrhrap7yzuv', NULL, 'Radio', NULL),
(73, 1, 'East Africa Radio FM', 'https://eatv.radioca.st/stream', NULL, 'Radio', NULL),
(74, 1, 'Fnf.Fm Hindi', 'http://192.99.8.192:5032/;stream', NULL, 'Radio', NULL),
(75, 1, 'Hayatmix', 'http://hayatmix.net/;yayin.mp3/;', NULL, 'Radio', NULL),
(76, 1, 'CNR-1 中国之声', 'https://lhttp.qtfm.cn/live/15318317/64k.mp3', NULL, 'Radio', NULL),
(77, 1, '怀集音乐之声', 'https://lhttp.qingting.fm/live/4804/64k.mp3', NULL, 'Radio', NULL),
(78, 1, 'CNR-2 经济之声', 'http://ngcdn002.cnr.cn/live/jjzs/index.m3u8', NULL, 'Radio', NULL),
(79, 1, '国际新闻', 'https://lhttp.qtfm.cn/live/20500172/64k.mp3', NULL, 'Radio', NULL),
(80, 1, 'I-Radio Jakarta', 'http://stream.radiojar.com/4ywdgup3bnzuv', NULL, 'Radio', NULL),
(81, 1, 'MANGORADIO', 'https://mangoradio.stream.laut.fm/mangoradio', NULL, 'Radio', NULL),
(82, 1, 'RMF FM', 'http://195.150.20.242:8000/rmf_fm', NULL, 'Radio', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `IdFavorito` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `IdEstacion` int(11) NOT NULL,
  `FechaAgregado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`IdFavorito`, `IdUsuario`, `IdEstacion`, `FechaAgregado`) VALUES
(1, 1, 1, '2026-04-14 22:43:51'),
(2, 1, 2, '2026-04-14 22:44:06'),
(3, 1, 3, '2026-04-15 09:12:07'),
(9, 4, 1, '2026-04-30 14:19:52'),
(10, 4, 66, '2026-04-30 14:20:04'),
(11, 4, 36, '2026-04-30 14:25:19'),
(17, 4, 47, '2026-04-30 15:04:41'),
(19, 4, 10, '2026-04-30 15:05:06'),
(20, 4, 4, '2026-05-02 12:48:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `IdHistorial` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `IdEstacion` int(11) NOT NULL,
  `FechaEscucha` datetime DEFAULT current_timestamp(),
  `DuracionSegundos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`IdHistorial`, `IdUsuario`, `IdEstacion`, `FechaEscucha`, `DuracionSegundos`) VALUES
(5, 1, 12, '2026-04-29 23:21:31', NULL),
(10, 3, 15, '2026-04-29 23:39:25', NULL),
(11, 3, 16, '2026-04-29 23:39:31', NULL),
(14, 3, 18, '2026-04-30 00:07:51', NULL),
(15, 3, 19, '2026-04-30 00:10:26', NULL),
(16, 3, 20, '2026-04-30 00:10:28', NULL),
(19, 1, 21, '2026-04-30 00:18:00', NULL),
(20, 1, 22, '2026-04-30 00:18:14', NULL),
(21, 3, 3, '2026-04-30 00:25:03', NULL),
(22, 3, 13, '2026-04-30 00:39:07', NULL),
(23, 3, 14, '2026-04-30 00:39:10', NULL),
(24, 1, 2, '2026-04-30 00:52:29', NULL),
(26, 1, 23, '2026-04-30 01:00:35', NULL),
(27, 1, 24, '2026-04-30 01:00:38', NULL),
(28, 1, 25, '2026-04-30 01:00:41', NULL),
(31, 1, 27, '2026-04-30 01:04:35', NULL),
(32, 1, 28, '2026-04-30 01:04:39', NULL),
(33, 1, 29, '2026-04-30 01:04:44', NULL),
(41, 1, 33, '2026-04-30 01:32:24', NULL),
(43, 3, 7, '2026-04-30 01:34:36', NULL),
(44, 3, 17, '2026-04-30 01:34:42', NULL),
(45, 3, 4, '2026-04-30 01:35:45', NULL),
(77, 1, 11, '2026-04-30 10:13:46', NULL),
(87, 1, 3, '2026-04-30 10:23:39', NULL),
(88, 1, 35, '2026-04-30 10:23:46', NULL),
(97, 1, 37, '2026-04-30 10:24:42', NULL),
(100, 1, 26, '2026-04-30 10:24:59', NULL),
(102, 1, 40, '2026-04-30 10:25:08', NULL),
(118, 1, 41, '2026-04-30 10:31:47', NULL),
(124, 1, 4, '2026-04-30 10:33:54', NULL),
(126, 1, 36, '2026-04-30 10:33:57', NULL),
(127, 1, 42, '2026-04-30 10:34:02', NULL),
(128, 1, 43, '2026-04-30 10:34:04', NULL),
(129, 1, 38, '2026-04-30 10:34:05', NULL),
(130, 1, 10, '2026-04-30 10:34:08', NULL),
(131, 1, 39, '2026-04-30 10:34:13', NULL),
(133, 1, 7, '2026-04-30 10:36:22', NULL),
(134, 1, 8, '2026-04-30 10:36:25', NULL),
(135, 1, 9, '2026-04-30 10:36:31', NULL),
(136, 1, 30, '2026-04-30 10:36:33', NULL),
(137, 1, 31, '2026-04-30 10:36:35', NULL),
(138, 1, 5, '2026-04-30 10:36:38', NULL),
(139, 1, 44, '2026-04-30 10:36:40', NULL),
(140, 1, 34, '2026-04-30 10:36:43', NULL),
(141, 1, 45, '2026-04-30 10:36:48', NULL),
(142, 1, 46, '2026-04-30 10:36:52', NULL),
(143, 1, 32, '2026-04-30 10:36:54', NULL),
(146, 1, 1, '2026-04-30 10:47:42', NULL),
(151, 4, 51, '2026-04-30 13:32:14', NULL),
(152, 4, 52, '2026-04-30 13:32:37', NULL),
(153, 4, 53, '2026-04-30 13:33:02', NULL),
(154, 4, 48, '2026-04-30 13:33:16', NULL),
(155, 4, 50, '2026-04-30 13:33:24', NULL),
(156, 4, 49, '2026-04-30 13:33:32', NULL),
(160, 4, 55, '2026-04-30 13:53:00', NULL),
(161, 4, 56, '2026-04-30 13:53:28', NULL),
(162, 4, 40, '2026-04-30 13:53:39', NULL),
(168, 4, 54, '2026-04-30 14:01:07', NULL),
(170, 4, 57, '2026-04-30 14:04:00', NULL),
(171, 4, 58, '2026-04-30 14:04:37', NULL),
(172, 4, 59, '2026-04-30 14:04:56', NULL),
(173, 4, 60, '2026-04-30 14:04:59', NULL),
(174, 4, 61, '2026-04-30 14:05:02', NULL),
(178, 4, 26, '2026-04-30 14:12:26', NULL),
(179, 4, 62, '2026-04-30 14:12:42', NULL),
(180, 4, 63, '2026-04-30 14:12:48', NULL),
(185, 4, 65, '2026-04-30 14:18:31', NULL),
(188, 4, 66, '2026-04-30 14:20:01', NULL),
(192, 4, 67, '2026-04-30 14:25:27', NULL),
(194, 4, 68, '2026-04-30 14:36:37', NULL),
(195, 4, 36, '2026-04-30 14:36:50', NULL),
(196, 4, 38, '2026-04-30 14:36:54', NULL),
(198, 4, 69, '2026-04-30 14:37:09', NULL),
(199, 4, 70, '2026-04-30 14:37:24', NULL),
(200, 4, 71, '2026-04-30 14:37:35', NULL),
(201, 4, 72, '2026-04-30 14:37:46', NULL),
(202, 4, 73, '2026-04-30 14:38:09', NULL),
(204, 4, 74, '2026-04-30 14:38:56', NULL),
(206, 4, 75, '2026-04-30 15:04:47', NULL),
(224, 4, 4, '2026-05-02 12:52:42', NULL),
(225, 4, 10, '2026-05-02 12:52:44', NULL),
(238, 4, 1, '2026-05-02 14:42:32', NULL),
(244, 4, 76, '2026-05-02 14:48:01', NULL),
(245, 4, 77, '2026-05-02 14:48:04', NULL),
(246, 4, 78, '2026-05-02 14:48:09', NULL),
(247, 4, 79, '2026-05-02 14:48:20', NULL),
(248, 4, 80, '2026-05-02 14:48:34', NULL),
(249, 4, 6, '2026-05-02 14:49:08', NULL),
(250, 4, 64, '2026-05-02 14:49:43', NULL),
(251, 4, 81, '2026-05-02 14:50:26', NULL),
(252, 4, 82, '2026-05-02 14:50:50', NULL),
(253, 4, 47, '2026-05-02 14:52:25', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invitacionesjam`
--

CREATE TABLE `invitacionesjam` (
  `IdInvitacion` int(11) NOT NULL,
  `IdJam` int(11) NOT NULL,
  `IdRemitente` int(11) NOT NULL,
  `IdDestinatario` int(11) NOT NULL,
  `Estado` varchar(20) DEFAULT 'Pendiente',
  `Fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `invitacionesjam`
--

INSERT INTO `invitacionesjam` (`IdInvitacion`, `IdJam`, `IdRemitente`, `IdDestinatario`, `Estado`, `Fecha`) VALUES
(1, 1, 1, 3, 'Aceptada', '2026-04-30 10:37:41'),
(2, 2, 1, 3, 'Aceptada', '2026-04-30 10:43:52'),
(3, 3, 1, 3, 'Aceptada', '2026-04-30 10:47:55'),
(4, 5, 4, 1, 'Pendiente', '2026-05-02 14:43:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jam`
--

CREATE TABLE `jam` (
  `IdJam` int(11) NOT NULL,
  `IdEstacion` int(11) NOT NULL,
  `IdCreador` int(11) NOT NULL,
  `Codigo` varchar(50) DEFAULT NULL,
  `Estado` varchar(20) DEFAULT NULL,
  `FechaInicio` datetime DEFAULT NULL,
  `FechaFin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `jam`
--

INSERT INTO `jam` (`IdJam`, `IdEstacion`, `IdCreador`, `Codigo`, `Estado`, `FechaInicio`, `FechaFin`) VALUES
(3, 1, 1, 'YMIJSQ', 'Terminada', '2026-04-30 10:47:44', '2026-04-30 10:48:20'),
(4, 47, 4, 'TSOU71', 'Terminada', '2026-04-30 13:24:39', '2026-04-30 13:24:46'),
(5, 47, 4, 'DPK3IM', 'Terminada', '2026-05-02 14:43:28', '2026-05-02 14:43:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jamusuario`
--

CREATE TABLE `jamusuario` (
  `IdJamUsuario` int(11) NOT NULL,
  `IdJam` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `FechaUnion` datetime DEFAULT current_timestamp(),
  `Rol` varchar(20) DEFAULT NULL,
  `UltimoHeartbeat` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `IdPais` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `CodigoISO` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`IdPais`, `Nombre`, `CodigoISO`) VALUES
(1, 'México', 'Mé'),
(2, 'Brasil', 'BRA'),
(3, 'Rusia', 'RUS'),
(4, 'Internacional', 'INT'),
(5, 'Estados Unidos', 'EST'),
(6, 'California, The United States Of America', 'CAL'),
(7, 'The United Arab Emirates', 'THE'),
(8, 'Papúa Nueva Guinea', 'PAP'),
(9, 'Cuba', 'CUB'),
(10, 'Etiopía', 'ETI'),
(11, 'India', 'IND'),
(12, 'Turkmenistán', 'TUR'),
(13, 'Favoritos', 'FAV');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `IdUsuario` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`IdUsuario`, `Username`, `Correo`, `Contrasena`) VALUES
(1, 'Gael Razo', 'galekrazom@gmail.com', '$2y$10$nw1qy4tV0UTdqw2a0HLXj.YzTtMrD243AOIE1td6jZtB2ELcY333q'),
(2, 'Karla', 'karla@gmail.com', '$2y$10$ZUoFNMtU5facR37hW8r5xuqJRbnCmLZlPenDBNesaaDnl1wspKTHu'),
(3, 'Arturo', 'Arturotest@gmail.com', '$2y$10$AQUpF90g09.JxPOUsNqyGOWowDlUyL1FydXwedy3h5h/zfAARPccu'),
(4, 'sansan', 'sandovalyaneth54@gmail.com', '$2y$10$qwi23Px0oeOSUYzJP6F9CuyFkAiRaFSKRNP4TipQYFPDe1yYvskKe');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD PRIMARY KEY (`IdAmigos`),
  ADD KEY `Username` (`Username`),
  ADD KEY `IdUsuarioAmigo` (`IdUsuarioAmigo`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`IdCiudad`),
  ADD KEY `IdPais` (`IdPais`);

--
-- Indices de la tabla `estaciones`
--
ALTER TABLE `estaciones`
  ADD PRIMARY KEY (`IdEstacion`),
  ADD KEY `IdCiudad` (`IdCiudad`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`IdFavorito`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdEstacion` (`IdEstacion`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`IdHistorial`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdEstacion` (`IdEstacion`);

--
-- Indices de la tabla `invitacionesjam`
--
ALTER TABLE `invitacionesjam`
  ADD PRIMARY KEY (`IdInvitacion`),
  ADD KEY `IdJam` (`IdJam`),
  ADD KEY `IdRemitente` (`IdRemitente`),
  ADD KEY `IdDestinatario` (`IdDestinatario`);

--
-- Indices de la tabla `jam`
--
ALTER TABLE `jam`
  ADD PRIMARY KEY (`IdJam`),
  ADD UNIQUE KEY `Codigo` (`Codigo`),
  ADD KEY `IdEstacion` (`IdEstacion`),
  ADD KEY `IdCreador` (`IdCreador`);

--
-- Indices de la tabla `jamusuario`
--
ALTER TABLE `jamusuario`
  ADD PRIMARY KEY (`IdJamUsuario`),
  ADD KEY `IdJam` (`IdJam`),
  ADD KEY `IdUsuario` (`IdUsuario`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`IdPais`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Correo` (`Correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `amigos`
--
ALTER TABLE `amigos`
  MODIFY `IdAmigos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `IdCiudad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `estaciones`
--
ALTER TABLE `estaciones`
  MODIFY `IdEstacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `IdFavorito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `IdHistorial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT de la tabla `invitacionesjam`
--
ALTER TABLE `invitacionesjam`
  MODIFY `IdInvitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `jam`
--
ALTER TABLE `jam`
  MODIFY `IdJam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `jamusuario`
--
ALTER TABLE `jamusuario`
  MODIFY `IdJamUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `pais`
--
ALTER TABLE `pais`
  MODIFY `IdPais` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD CONSTRAINT `amigos_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `usuarios` (`Username`),
  ADD CONSTRAINT `amigos_ibfk_2` FOREIGN KEY (`IdUsuarioAmigo`) REFERENCES `usuarios` (`IdUsuario`);

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`IdPais`) REFERENCES `pais` (`IdPais`);

--
-- Filtros para la tabla `estaciones`
--
ALTER TABLE `estaciones`
  ADD CONSTRAINT `estaciones_ibfk_1` FOREIGN KEY (`IdCiudad`) REFERENCES `ciudades` (`IdCiudad`);

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`),
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`IdEstacion`) REFERENCES `estaciones` (`IdEstacion`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`),
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`IdEstacion`) REFERENCES `estaciones` (`IdEstacion`);

--
-- Filtros para la tabla `invitacionesjam`
--
ALTER TABLE `invitacionesjam`
  ADD CONSTRAINT `invitacionesjam_ibfk_1` FOREIGN KEY (`IdJam`) REFERENCES `jam` (`IdJam`),
  ADD CONSTRAINT `invitacionesjam_ibfk_2` FOREIGN KEY (`IdRemitente`) REFERENCES `usuarios` (`IdUsuario`),
  ADD CONSTRAINT `invitacionesjam_ibfk_3` FOREIGN KEY (`IdDestinatario`) REFERENCES `usuarios` (`IdUsuario`);

--
-- Filtros para la tabla `jam`
--
ALTER TABLE `jam`
  ADD CONSTRAINT `jam_ibfk_1` FOREIGN KEY (`IdEstacion`) REFERENCES `estaciones` (`IdEstacion`),
  ADD CONSTRAINT `jam_ibfk_2` FOREIGN KEY (`IdCreador`) REFERENCES `usuarios` (`IdUsuario`);

--
-- Filtros para la tabla `jamusuario`
--
ALTER TABLE `jamusuario`
  ADD CONSTRAINT `jamusuario_ibfk_1` FOREIGN KEY (`IdJam`) REFERENCES `jam` (`IdJam`),
  ADD CONSTRAINT `jamusuario_ibfk_2` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
