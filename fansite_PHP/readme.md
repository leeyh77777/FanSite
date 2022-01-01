# IU FanSite - PHP
## 내용
Mysql 데이터베이스 연동
- - -
## PHP 핵심 기술
### 1. 공통 정의 부분 설정
* [common.php]()
: 공통으로 들어갈 기능 정의
```
1. header 설정(CORS 접근 허용)
	ㄱ.header("Access-Control-Allow-Origin: *");
		// 도메인 요청 권한 부여
	ㄴ.header("Access-Control-Allow-Headers: *");
		// 브라우저 헤더 허용
	ㄷ.header("Access-Control-Allow-Methods: *");
		// HTTP 메소드 허용
	ㄹ.header("Content-Type: application/json; charset=utf-8");
		// 
2. 클래스 사용을 위한 include (원하는 클래스 인스턴스 생성후 사용)

3. $inputData 정의
	ㄱ.$inputData = file_get_contents("PHP://input");
		// vue에서 보내는 JSON데이터를 받기위해 사용
	ㄴ.$in = json_decode($inputData, true);
		// $inputData(JSON)를 PHP배열로 변환
```

* [output.php]()
: json으로 데이터 송신
```
$result = [
	'success' => $success,
	'data' => $returnData,
	'message' => $message,
];

echo json_encode($result);
// JSON형식으로 result값을 반환한다.
```
- - -
### 2. 데이터 연동
#### member
1. /member : 폴더 member생성으로 '/member' 라우팅

2. /member/index.php : route mode 설정 (mode로 요청이 들어오면 switch case로 해당 모드 선택후 실행)

* join (회원가입 처리) : lib/Member의 join() 메서드 실행, 완료시 값을 json 으로 반환

* update (회원정보 수정) : lib/Member의 update() 메서드 실행, 완료시 값을 json으로 반환

* login (로그인) : lib/Member의 login() 메서드 실행, 완료시 값을 json으로 반환

* get_member (토큰으로 회원정보 조회) : lib/Member의 getMember() 메서드를 실행, 완료시 값을 json으로 반환

3. lib/Member : DB 연동 클래스
* db 인스턴스생성

* join() (회원가입 로직)