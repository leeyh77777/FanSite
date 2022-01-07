<?php
include_once "../common.php"; // 공통 정의 부분
/**
 * 뉴스 추가, 수정, 삭제처리
 *
 */
$news = News::getInstance();

try {
	/** 회원 전용 서비스 체크 */
	if (!Request::get("memNo")) {
		throw new Exception("회원전용 서비스 입니다.");
	}
	
	switch(Request::get("mode")) {
		/** 뉴스 추가 */
		case "add" :
			$idx = $news->addNews($in);
			if (!$idx) {
				throw new Exception("뉴스등록을 실패하였습니다.");
			}
			
			$success = true;
			$returnData = ["idx" => $idx];
			break;
		/** 뉴스 수정 */
		case "edit" :
			$result = $news->editNews($in);
			if (!$result) {
				throw new Exception("뉴스수정을 실패하였습니다.");
			}
			
			$success = true;
			$returnData = ["idx" => $idx];
			break;
		/** 뉴스 삭제 */
		case "delete" :
			if (!isset($in['idx']) || !$in['idx']) {
				throw new Exception("뉴스등록번호 누락");
			}
			
			$info = $news->get($in['idx']);
			if (!$info) {
				throw new Exception("삭제할 뉴스가 없습니다.");
			}
			
			if ($info['memNo'] != $in['memNo']) {
				throw new Exception("본인이 작성한 뉴스만 삭제 가능합니다.");
			}
			
			$result = $news->deleteNews(Request::get("idx"));
			if (!$result) {
				throw new Exception("뉴스삭제 실패하였습니다.");
			}
			
			$success = true;
			break;
		/** 뉴스 목록 */
		case "getList" :
			$status = Request::get("status", "etc");
			$result = $news->getList($status);
			if (!$result) {
				throw new Exception("뉴스 목록 조회 실패");
			}
			
			$success = true;
			$returnData = $result;
			break;
		/** 뉴스 내용 */
		case "get" :
			$idx = Request::get("idx");
			if (!$idx) {
					throw new Exception("뉴스등록번호 누락");
			}
			
			$result = $news->get($idx);
			if (!$result) {
				throw new Exception("뉴스가 없습니다.");
			}
			
			$success = true;
			$returnData = $result;
			break;
		default :
			if (Request::get("origin") != 'front') {
					echo "<script>location.replace('/');</script>";
					exit;
			}
	}
} catch (Exception $e) {
	$message = $e->getMessage();
}

include_once "../output.php";