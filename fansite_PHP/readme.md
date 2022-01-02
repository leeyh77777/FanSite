# IU FanSite - PHP
## 내용
Mysql 데이터베이스 연동
- - -
## PHP 핵심 기술
### 1. 공통 정의 부분 설정
* [common.php](https://github.com/leeyh77777/FanSite/blob/main/fansite_PHP/common.php)
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
		// 한글 표기

2. 라이브러리 include(DB관련 기능 클래스 인스턴스 생성후 사용)

3. $inputData 정의
	ㄱ.$inputData = file_get_contents("PHP://input");
		// vue에서 보내는 JSON데이터를 받기위해 사용
	ㄴ.$in = json_decode($inputData, true);
		// $inputData(JSON)를 PHP배열로 변환
```

* [output.php](https://github.com/leeyh77777/FanSite/blob/main/fansite_PHP/output.php)
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
### 2. 라이브러리

[/lib/(라이브러리 폴더)](https://github.com/leeyh77777/FanSite/tree/main/fansite_PHP/lib) : DB 관련 기능 클래스

* [DB.php](https://github.com/leeyh77777/FanSite/blob/main/fansite_PHP/lib/DB.php)
: DB 연결 클래스
```
1. PDO 인터페이스 상속 
2. 생성자생성(dsn, username, password)
3. getInstance() 함수로 new DB(); 인스턴스 생성
```

* [Request.php](https://github.com/leeyh77777/FanSite/blob/main/fansite_PHP/lib/Request.php)
: inputData 연결 클래스
```
Request::get()으로 인풋데이터를 가져온다.
	// 인풋데이터의 키값을 매개변수로 받아서 위의 $in과 다르게 하나씩 받음
	// '$default = null' 설정하여 없는 배열속성, 변수에 대한 접근에러 방지
```

* 각 라우팅별 DB 연동 클래스
- - -
### 3. 데이터 연동
#### /member
1. [/member](https://github.com/leeyh77777/FanSite/tree/main/fansite_PHP/member)
: 폴더 member생성으로 '/member' 라우팅

2. [/member/index.php](https://github.com/leeyh77777/FanSite/blob/main/fansite_PHP/member/index.php)
: route mode 설정 (mode로 요청이 들어오면 switch case로 해당 모드 선택후 실행)

* [join (회원가입 처리)](https://github.com/leeyh77777/FanSite/blob/main/fansite_PHP/member/index.php#L11)
: lib/Member의 join() 메서드 실행, 완료시 값을 json 으로 반환

* [update (회원정보 수정)](https://github.com/leeyh77777/FanSite/blob/main/fansite_PHP/member/index.php#L20)
: lib/Member의 update() 메서드 실행, 완료시 값을 json으로 반환

* [login (로그인)](https://github.com/leeyh77777/FanSite/blob/main/fansite_PHP/member/index.php#L28)
: lib/Member의 login() 메서드 실행, 완료시 값을 json으로 반환

* [getMember (토큰으로 회원정보 조회)](https://github.com/leeyh77777/FanSite/blob/main/fansite_PHP/member/index.php#L37)
: lib/Member의 getMember() 메서드를 실행, 완료시 값을 json으로 반환

3. [lib/Member](https://github.com/leeyh77777/FanSite/blob/d21dc6413f7acfde29b93efaeb8707c2c30f4913/fansite_PHP/lib/Member.php)
: DB 연동 클래스

* db 인스턴스생성

* [join($data)](https://github.com/leeyh77777/FanSite/blob/d21dc6413f7acfde29b93efaeb8707c2c30f4913/fansite_PHP/lib/Member.php#L23)
: 회원가입 로직
```
ㄱ. checkJoinData($data)메서드로 $data 유효성 검사
ㄴ. password_hash() 메서드로 비밀번호 암호화
ㄷ. preg_replace()메서드로 전화번호에서 숫자가아닌 문자는 공백처리
ㄹ. PDO::prepare로 데이터 바인딩
```

* [update($data)](https://github.com/leeyh77777/FanSite/blob/d21dc6413f7acfde29b93efaeb8707c2c30f4913/fansite_PHP/lib/Member.php#L53)
: 회원정보 수정 로직
```
ㄱ. token, memNm 누락시 에러메세지 출력
ㄴ. checkPassword($data['memPw'], $data['memPwRe']);로 비밀번호, 비밀번호 확인 체크
ㄷ. checkCellPhone($cellPhone) 메서드로 전화번호 형식체크 
ㄹ. PDO::prepare로 데이터 바인딩
```

* [login($data)](https://github.com/leeyh77777/FanSite/blob/d21dc6413f7acfde29b93efaeb8707c2c30f4913/fansite_PHP/lib/Member.php#L105)
: 로그인 처리 로직
```
ㄱ. 아이디, 비밀번호, 회원정보 유무체크
ㄴ. password_verify()메서드로 비밀번호 일치 체크
ㄷ. generateToken($data['memId'])메소드로 토큰 발급
```

* [get($memNo, $isLogin = false)](https://github.com/leeyh77777/FanSite/blob/d21dc6413f7acfde29b93efaeb8707c2c30f4913/fansite_PHP/lib/Member.php#L231)
:회원정보 조회
```
ㄱ. join은 memberNo, login은 memberId로 회원정보
ㄴ. is_numeric() 메서드로 $memNo 파라미터가 숫자가 아니면 memId로 회원정보 조회
```

* [generateToken($memId)](https://github.com/leeyh77777/FanSite/blob/main/fansite_PHP/lib/Member.php#L263)
: 토큰 발급
```
ㄱ. uniquid로 마이크로초단위의 현재시간을 md5로 암호화해서 토큰 발급
ㄴ. $expireTime을 현재시간보다 두시간 빠르게 설정하여 오버될시 토큰 만료
```

