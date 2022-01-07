<?php
include_once "../common.php"; // 공통 정의 부분
/**
 * 게시판 추가, 수정, 삭제 처리
 *
 */
$board = Board::getInstance();

try {
	switch(Request::get("mode")) {
		case "list" :
			$success = true;
			$returnData = $board->get($in);
			break;
		case "add" :
			$result = $board->add($in);
			if (!$result) {
				throw new Error("게시글 등록 실패");
			}
			
			$success = true;
			$returnData = ["idx" => $result];
			break;
		case "get" :
			$idx = Request::get("idx");
		
			if (!$idx) {
				throw new Error("게시글 등록번호 누락");
			}
			
			$result = $board->get($idx);
			if (!$result) {
				throw new Error("게시글이 없습니다.");
			}
			
			$success = true;
			$returnData = $result;
			break;
		case "view":
			if (!Request::get("memNo")) {
				throw new Error("회원전용 서비스 입니다.");
			}
			$idx = Request::get("idx", 0);
			$result = $board->view($idx);
			if (!$result) {
				throw new Error('목록조회 실패');
			}
			
			$success = true;
			$returnData = $result;
			break;
		case "delete":
			$info = $board->view(Request::get("idx"));
			if (!$info) {
				throw new Error('삭제할 게시글이 없습니다.');
			}
			
			$result = $board->delete(Request::get("idx"));
			if (!$result) {
				throw new Error('게시글삭제 실패하였습니다.');
			}
			
			$success = true;
			break;
		case "edit":
			$result = $board->edit($in);
			if (!$result) {
				throw new Error('게시글 수정이 실패하였습니다.');
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