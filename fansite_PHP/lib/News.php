<?php
/**
 * 뉴스 추가, 수정, 삭제, 조회
 *
 */
class News {
	private $db;
	private static $instance;
	
	/** 필수 입력항목 */
	private $required = [
		"memNo" => "회원만 사용가능한 서비스 입니다.",
		"status" => "뉴스 구분을 선택하세요",
		"subject" => "뉴스명을 입력하세요.",
		"content" => "뉴스내용을 입력하세요.",
	];
	
	private function __construct() {
		$this->db = DB::getInstance();
	}
	
	public static function getInstance() {
		if (!self::$instance) {
			self::$instance = new News();
		}
		
		return self::$instance;
	}
	
	/** 뉴스 추가 */
	public function addNews($data) {
		
		$this->checkData($data); // 데이터 유효성 검사
		
		$sql = "INSERT INTO newslist (memNo, status, subject, content)
										VALUES (:memNo, :status, :subject, :content)";
		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(":memNo", $data['memNo'], PDO::PARAM_INT);
		$stmt->bindValue(":status", $data['status']);
		$stmt->bindValue(":subject", $data['subject']);
		$stmt->bindValue(":content", $data['content']);
		$result = $stmt->execute();
		if (!$result) {
			return false;
		}
		
		$idx = $this->db->lastInsertId();
		
		return $idx;
	}
	
	/** 작업 수정 */
	public function editNews($data) {
		$this->required['idx'] = "뉴스등록번호가 누락되었습니다.";
		$this->checkData($data);
		
		$info = $this->get($data['idx']);
		if (!$info) {
			throw new Exception("수정할 뉴스내역이 없습니다.");
		}
		
		$sql = "UPDATE newslist
					SET
						status = :status,
						subject = :subject,
						content = :content
					WHERE
						idx = :idx";
		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(":status", $data['status']);
		$stmt->bindValue(":subject", $data['subject']);
		$stmt->bindValue(":content", $data['content']);
		$stmt->bindValue(":idx", $data['idx'], PDO::PARAM_INT);
		
		$result = $stmt->execute();
		
		return $result;
	}
	
	/** 뉴스 삭제 */
	public function deleteNews($idx) {
		$sql = "DELETE FROM newslist WHERE idx = :idx";
		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(":idx", $idx, PDO::PARAM_INT);
		return $stmt->execute();
	}
	
	/**
	 * 뉴스 목록
	 *
	 * @param status - actor, singer, etc
	 */
	public function getList($status) {
		$sql = "SELECT * FROM newslist WHERE status = :status ORDER BY regDt DESC";
		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(":status", $status);
		$result = $stmt->execute();
		
		$rows = [];
		while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			array_push($rows, $row);
		}
		
		return $rows;
	}
	
	/**
	 * 뉴스내용 조회
	 *
	 * @param $idx 뉴스 등록번호
	 */
	public function get($idx) {
		$sql = "SELECT * FROM newslist WHERE idx = :idx";
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
	
	/** 데이터 유효성 검사 */
	public function checkData($data) {
		if ($data['mode'] == 'edit') {
			$this->required['idx'] = "뉴스등록번호가 누락되었습니다.";
		}
		foreach ($this->required as $key => $msg) {
			if (!isset($data[$key]) || ($data[$key] && trim($data[$key]) == "")) {
				throw new Exception($msg);
			}
		}
	}
}