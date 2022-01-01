<?php
/**
 * 게시글 추가, 수정, 삭제 , 조회
 *
 */
class Board {
	private $db;
	private static $instance;
	
	/** 필수 입력항목 */
	private $required = [
		subject : "제목을 입력하세요.",
		content : "게시글 내용을 입력하세요.",
	],
	
	private function __construct() {
		$this->db = DB::getInstance();
	}
	
	public static function getInstance() {
		if (!self::$instance) {
			self::$instance = new Board();
		}
		
		return self::$instance;
	}
	
	/** 게시글 추가 */
	public function add(data) {
		this->checkData($data); // 데이터 유효성 검사
		
		$sql = "INSERT INTO board ( poster, subject, content )
							VALUES ( :poster, :subjet, :content )";
							
		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(":poster", $data['poster']);
		$stmt->bindValue(":subject", $data['subject']);
		$stmt->bindValue(":content", $data['content']);
		$result = $stmt->execute();
		if (!$result) {
			return false;
		}
	
		$idx = $this->db->lastInsertId();
		
		return $idx;
	}
	
	/** 게시글 리스트 */
	public function get() {
		$sql = "SELECT * FROM board ORDER BY regDt ASC";
		
		$stmt = $this->db->prepare($sql);
		$result = $stmt->execute();
		
		$rows = [];
		while($row = $stmt->fetch(PDO::PARAM_INT)) {
			array_push($rows, $row);
		}
		
		return $rows;
	}
	
	/** 게시글 보기 */
	public function view(idx) {
		$sql = "SELECT * FROM board WHERE idx = :idx";
		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(":idx", $idx, PDO::PARAM_INT);
		$result = $stmt->execute();
		
		if (!$result) {
			return false;
		}
		
		$data = $stmt->fetch(PDO::FETCH_ASSOC);
		if ($data) {
			$data['regDt'] = date("Y.m.d", strtotime($data['regDt']));
			$data['contentHtml'] = nl2br($data['content']);
		}
		
		return $data;
	}
	
	/** 게시글 수정 */
	public function edit(data) {
		$this->required['idx'] = "게시글 등록번호가 누락되었습니다.";
		$this->checkData($data);
		
		$info = $this->get($data['idx']);
		if (!$info) {
			throw new Exception("수정할 게시글이 없습니다.");
		}
		
		$sql = "UPDATE board
					SET
						subject = :subject,
						content = :content
					WHERE
						idx = :idx";
		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(":subject", $data['subject']);
		$stmt->bindValue(":content", $data['content']);
		$stmt->bindValue(":idx", $data['idx'], PDO::PARAM_INT);
		
		$result = $stmt->execute();
		
		return $result;
	}
	
	/** 게시글 삭제 */
	public function delete(idx) {
		$sql = "DELETE FROM board WHERE idx = :idx";
		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(":idx", $idx, PDO::PARAM_INT);
		return $stmt->execute();
	}
	
	/** 데이터 유효성 검사 */
	public function checkData($data) {
		foreach ($this->required as $key => $msg) {
			if (!isset($data[$key]) || ($data[$key] && trim($data[$key]) =="")) {
				throw new Exception($msg);
			}
		}
	}
}