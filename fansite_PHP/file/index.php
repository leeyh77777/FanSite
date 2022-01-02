<?php
include_once "../common.php"; // 공통 정의 부분
/**
 * 파일 업로드 처리
 *
 */
$file = File::getInstance();

try {
	switch(Request::get("mode")) {
		case "upload" :
			$result = $file->upload($in);
			if(!$result) {
				throw new Error("파일 업로드 실패");
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
	$message = $e->getMesssage();
}

include_once "../ouput.php";