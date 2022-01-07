<?php
/**
 * 파일 업로드 관련
 *
 */
class File {
	private $db; // DB 인스턴스 
	private static $instance;
	
	private function __construct() {
		$this->db = DB::getInstance();
	}
	
	public static function getInstance() {
		if (!self::$instance) {
			self::$instance = new File();
		}
		
		return self::$instance;
	}
	/** 파일 업로드 처리 */
	public function upload($data) {
		/** 유효성 검사 */
		if (!isset($data['fileName']) || !$data['fileName'] || !isset($data['fileType']) || !$data['fileType'] || !isset($data['data']) || !$data['data']) {
			throw new Error("잘못된 접근입니다.");
		}
		$image = $data['fileType'];
		$typeImage = 'image';
		$pos = strpos($image, $typeImage);
		if($pos === false){
			throw new Error("이미지 형식의 파일만 업로드 가능합니다.");
		}
		$sql = "INSERT INTO fileinfo (fileName, fileType) VALUES (:fileName, :fileType)";
		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(":fileName", $data['fileName']);
		$stmt->bindValue(":fileType", $data['fileType']);
		$result = $stmt->execute();
		if (!$result) { // SQL 실행 실패 -> SQL 오류 
			$errorInfo = $this->db->errorInfo();
			throw new Exception(implode("/", $errorInfo));
		}
		
		$fileName = $data['fileName'];
		$ext = pathinfo($fileName, PATHINFO_EXTENSION);
		$ext = $ext?".".$ext:"";
		$idx = $this->db->lastInsertId();
		$upload = __DIR__ . "/../upload/";
		if(!file_exists($upload)) {
			mkdir($upload, 0777, true);
		}
		$pth = $upload.$idx.$ext;
		$content = $data['data'];
		$buffers = base64_decode($content);
		file_put_contents($pth, $buffers);
		
		/** 파일 업로드 후 저장된 파일 정보 전송 */
		$fileInfo = $this->get($idx);
		
		return $fileInfo;
	}
	
	/**
	 * 파일 정보 조회
	 *
	 */
	public function get($idx) {
		$sql = "SELECT * FROM fileinfo WHERE idx = :idx";
		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(":idx", $idx, PDO::PARAM_INT);
		$result = $stmt->execute();
		if (!$result) {
			return false;
		}
		$info = $stmt->fetch(PDO::FETCH_ASSOC);
		$fileName = $info['fileName'];
		$ext = pathinfo($fileName, PATHINFO_EXTENSION);
		$ext = $ext?".".$ext:"";
		$info['imageUrl'] = "/upload/".$idx.$ext;
		$upload = __DIR__ . "/../upload/";
		$info['imagePath'] = $upload.$idx.$ext;
		
		return $info;
	}
}