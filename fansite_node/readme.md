# IU FanSite - NodeJS
## 내용
express를 사용하여 라우팅 & 미들웨어 정의, MySQL데이터 베이스 연결
- - -
## NodeJs 핵심 기술
### 1. 서버 환경설정
* [app.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/app.js#L11)
: 웹 서버 PORT설정 process.env.PORT로 설정, 없을시에는 3000번 포트로 설정

### 2. header 연결 허용
* [app.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/app.js#L26)
: 응답헤더 설정으로 CORS 접근 허용
```
res.header("Access-Control-Allow-Origin", "*");
// 도메인 요청 권한 부여
res.header("Access-Control-Allow-Headers", "*");
// 브라우저 헤더 허용
```
### 3. 라우팅 구현
- - -
:one: ['/member'](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/member.js)

1. route등록 : [/member](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/app.js#L39)(app.use로 라우터 등록)

2. route mode 설정 : [/routes/member.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/member.js)
(mode로 요청이 들어오면 switch case로 해당 모드 선택후 실행)

* [join](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/member.js#L13) (회원가입 처리)
: models/member의 join(data) 메서드를 실행, 완료시 값을 json으로 반환

* [update](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/member.js#L22) (회원정보 수정)
: models/member의 update(data) 메서드를 실행, 완료시 값을 json으로 반환

* [login](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/member.js#L30) (로그인)
: models/member의 login(data) 메서드를 실행, 완료시 값을 json으로 반환

* [getMember](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/member.js#L39) (토큰으로 회원정보 조회)
: models/member의 getByToken(data.token) 메서드를 실행, 완료시 값을 json으로 반환

3. route 로직 [/models/member.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/member.js)
(DB(Mysql) 연동)

* [join(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/member.js#L14) (회원가입 로직)
```
ㄱ. checkJoinData() 메서드로 요청data 회원가입 유효성 검사
ㄴ. sequelize로 요청data Mysql에 INSERT 처리
ㄷ. password bcrypt로 암호화
ㄹ. 휴대전화번호 정규 표현식으로 숫자로만 처리
```

* [update(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/member.js#L52) (회원정보 수정)
```
ㄱ. token, memNm 누락시 에러 메세지 출력
ㄴ. checkPassword(memPw, memPwRe)메서드로 요청데이터 비밀번호 체크
ㄷ. checkPassword(cellPhone)메서드로 전화번호 숫자로만 설정, 휴대전화 패턴설정, 패턴과 맞지 않을시 에러메세지 출력
ㄹ. sequelize로 해당 member token으로 멤버 지정후 이름, 전화번호, 비밀번호 Mysql에 UPDATE 처리
```

* [login(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/member.js#L112) (로그인)
```
ㄱ. 아이디, 비밀번호 data 유무 체크 없을 시 에러 메세지 출력
ㄴ. get(memId) 메서드로 회원정보 조회 후 아이디가 없을시 에러 메시지 출력
ㄷ. bcrypt.compare로 요청data의 비밀번호와 DB의 비밀번호 일치 확인 후 불일치시 에러메세지 출력
ㄹ. generateToken(data.memId)메서드로 요청data의 아이디에 토큰, 토큰익스파이어즈 Mysql에 UPDATE 처리
ㄹ. sequelize로 해당 member token으로 멤버 지정후 이름, 전화번호, 비밀번호 Mysql에 UPDATE 처리
```

* [get(memNo, isLogin)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/member.js#L241) (회원정보 조회)
```
sequelize로 join()은 memberNo , login()은 memberId로 Mysql 회원정보 조회
```

* [generateToken(memId)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/member.js#L273) (토큰 발급)
```
ㄱ. login()메소드 실행시에 요청데이터의 멤버아이디로 발급한다.
ㄴ. token을 crypto 모듈로 'md5' 해시 알고리즘을 사용, Date.now()메소드를 변환하여 16진수로 인코딩.
ㄷ. tokenExpires를 현재시각에서 2시간 빠르게 설정
ㄹ. sequelize로 해당 memId로 지정 후 Mysql에 token, tokenExpires UPDATE 처리
```
- - -
:two: ['/news'](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/news.js)

1. route등록 : [/member](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/app.js#L40)(app.use로 라우터 등록)

2. route mode 설정 : [/routes/member.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/news.js)
(mode로 요청이 들어오면 switch case로 해당 모드 선택후 실행)

* [add](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/news.js#L13) (뉴스 추가)
: models/news의 addNews(data) 메서드를 실행, 완료시 값을 json으로 반환

* [edit](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/news.js#L25) (뉴스 수정)
: models/news의 editNews(data) 메서드를 실행, 완료시 값을 json으로 반환

* [delete](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/news.js#L35) (뉴스 삭제)
: models/news의 get(data.idx)로 뉴스정보 가져온 후, models/news의 deleteNews(data.idx) 메서드로 뉴스 삭제

* [getList](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/news.js#L57) (뉴스 목록)
: models/news의 getList(data) 메서드를 실행, 완료시 값을 json으로 반환

* [get](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/news.js#L73) (뉴스 내용)
: models/news의 get(data.idx) 메서드를 실행, 완료시 값을 json으로 반환

3. route 로직 [/models/news.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/news.js)
(DB(Mysql) 연동)

* [addNews(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/news.js#L15) (뉴스 추가 로직)
```
ㄱ. checkJoinData() 메서드로 요청data 뉴스 추가 입력 항목 검사
ㄴ. sequelize로 요청data Mysql에 INSERT 처리
```

* [editNews(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/news.js#L37) (뉴스 수정 로직)
```
ㄱ. checkJoinData() 메서드로 요청(idx추가)data 뉴스 추가 입력 항목 검사
ㄴ. get(data.idx) 메서드로 뉴스 정보 조회, 뉴스내역 유무와 본인이 작성한 뉴스 확인
ㄷ. sequelize로 요청data Mysql에 UPDATE 처리
```

* [deleteNews(idx)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/news.js#L76) (뉴스 삭제 로직)
```
sequelize로 요청idx Mysql에 DELETE 처리
```

* [getList(memNo, status)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/news.js#L94) (뉴스 목록 로직)
```
sequelize로 요청data의 status로 Mysql에 조회
```

* [get(idx)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/news.js#L114) (뉴스내용 조회 로직)
```
ㄱ. sequelize로 요청data의 idx로 Mysql에 조회
ㄴ. 정규표현식으로 뉴스생성일자 패턴정의
```
- - -
:three: ['/board'](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/board.js)

1. route등록 : [/board](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/app.js#L41)(app.use로 라우터 등록)

2. route mode 설정 : [/routes/board.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/board.js)
(mode로 요청이 들어오면 switch case로 해당 모드 선택후 실행)

* [list](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/board.js#L14) 
: models/board의 get(data) 메서드를 실행, 완료시 json으로 반환

* [get](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/board.js#L26)
: models/board의 get(data.idx) 메서드를 실행, 완료시 값을 json으로 반환

* [view](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/board.js#L39)
: models/board의 add(data) 메서드를 실행, 완료시 값을 json으로 반환

* [delete](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/board.js#L53) 
: models/board의 view(data.idx)로 게시글 정보 가져온 후, models/board의 delete(data.idx) 메서드로 게시글 삭제

* [edit](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/board.js#L66)
: models/board의 edit(data) 메서드를 실행, 완료시 값을 json으로 반환

3. route 로직 [/models/board.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/board.js)
(DB(Mysql) 연동)

* [add(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/board.js#L12)
```
ㄱ. checkJoinData() 메서드로 요청data 뉴스 추가 입력 항목 검사
ㄴ. sequelize로 요청data Mysql에 INSERT 처리
```

* [get()](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/board.js#L35)
```
mysql에 board 데이터 반환
```

* [view(idx)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/board.js#L49)
```
ㄱ. sequelize로 요청data의 idx로 Mysql에 조회
ㄴ. 정규표현식으로 게시글생성일자 패턴정의
```

* [edit(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/board.js#L81)
```
ㄱ. checkJoinData() 메서드로 요청(idx추가)data 게시글 추가 입력 항목 검사
ㄴ. get(data.idx) 메서드로 게시글 정보 조회, 게시글 유무 확인
ㄷ. sequelize로 요청data Mysql에 UPDATE 처리
```

* [delete(idx)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/board.js#L114)
```
sequelize로 요청idx Mysql에 DELETE 처리
```
- - -
:four: ['/file'](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/file.js)

1. route등록 : [/file](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/app.js#L42)(app.use로 라우터 등록)

2. route mode 설정 : [/routes/file.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/file.js)
(mode로 요청이 들어오면 switch case로 해당 모드 선택후 실행)

* [upload](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/routes/file.js#L14) (파일 업로드)
: models/file의 upload(data) 메서드를 실행, 완료시 값을 json으로 반환

3. route 로직 [/models/file.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/file.js)
(DB(Mysql) 연동)

* [upload(data)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/file.js#L10) (파일 업로드 처리 로직)
```
ㄱ. data의 파일네임, 타입, 데이터 없거나 파일타입이 image가 아니면 오류메세지 출력
ㄴ. sequelize로 요청data(fileName, fileType) Mysql에 INSERT 처리
ㄷ. Path모듈로 파일 경로, 이름, 확장자 지정('../public/upload/' + idx + ext)
ㄹ. fs모듈로 파일생성(base64 인코딩)
ㅁ. get(idx)메소드로 생성한 파일 정보 전송
```

* [get(idx)](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/file.js#L51) (파일정보 조회 로직)
```
ㄱ. sequelize로 idx로 fileInfo Mysql에 조회
ㄴ. 데이터에 imageUrl, imagePath 추가 하여 반환
```
- - -
### 4. DB 연결
* sequelize 라이브러리로 DB연결

* [config/config.json](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/config/config.json)
: DB 연결 설정

* [/models/index.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/models/index.js)
: sequelize 생성자

* [app.js](https://github.com/leeyh77777/FanSite/blob/main/fansite_node/app.js#L14)
: sync()메서드로 연결, 성공시 console창에 메세지 출력, 에러시 에러메세지 출력




