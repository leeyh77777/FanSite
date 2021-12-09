CREATE TABLE `newslist` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `memNo` int DEFAULT '0',
  `status` enum('actor','singer','etc') DEFAULT 'etc',
  `subject` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `regDt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modDt` datetime DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `ix_memNo` (`memNo`),
  KEY `ix_regDt_desc` (`regDt` DESC)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci