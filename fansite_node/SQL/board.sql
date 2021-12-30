CREATE TABLE `board` (
  `idx` int NOT NULL AUTO_INCREMENT COMMENT '게시글 등록 번호 ',
  `poster` varchar(45) DEFAULT NULL COMMENT '작성자명',
  `subject` varchar(255) DEFAULT NULL COMMENT '게시글 제목',
  `content` text COMMENT '게시글 본문',
  `regDt` datetime DEFAULT CURRENT_TIMESTAMP,
  `modDt` varchar(30) DEFAULT NULL COMMENT '게시글 수정 일시',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci