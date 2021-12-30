CREATE TABLE `fileinfo` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `fileName` varchar(100) NOT NULL,
  `fileType` varchar(70) NOT NULL,
  `regDt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modDt` datetime DEFAULT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci