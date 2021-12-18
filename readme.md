# IU FanSite - VueJS
#### 링크
* PHP로 구현된 FanSite (<http://dydhyun.cafe24.com/>)
* NodeJS로 구현된 FanSite (<http://dydhyun.cafe24app.com/>)
* VueJS 기술문서 (<>)
* NodeJS 기술문서 (<>)
* PHP 기술문서 (<>)
## 개요
### 1. 서비스 내용 
1. IU 프로필
2. IU 뉴스
3. 회원들 간 커뮤니케이션 제공

### 2. 적용기술
<img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### 3. 각 페이지별 소개

## 핵심기술
### 1. 페이지 초기화
* main.js: 페이지 초기화 설정
```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import init from './init.js'

const app = createApp(App) /** 어플리케이션 인스턴스 생성 */
init(app) /** 공통 저장소, 함수 설정 */
app.use(router).mount('#app') /** App.vue /router/index.js로 라우터 설정, id=app에 마운트 */
```
* App.vue: 루트 컴포넌트. <router-view/>로 랜더링 한다.(Vue 어플리케이션 id=app에 마운트 한다.)

* ./router/index.js: 라우터설정 & 컴포넌트 설정 

* init.js : 
1.app.use로 공통저장소(저장소 생성후 데이터 유지)설정 항상 실행
2.app.mixin(lib)로 공통함수(메서드:컴포넌트에서 mixin 불러오지 않아도 사용가능) 모듈(앞에 '$')생성
3.app.mixin(boot)로 로그인회원 정보 유지 메서드 실행

* common/store.js: vuex-persistedstate를 이용하여 localStorage에 저장하여 새로고침이 되어도 데이터를 유지
(state()에서 apiURL 설정, member(로그인회원정보)를 setMember를 받아서 데이터를 유지 한다.)

* common/lib.js: 공통 메서드 라이브러리

* bootstrap.js: 초기 공통 처리

### 2. 회원가입
* 라우팅 설정 : ./router/indxe.js -> '/join' 으로 설정
* 컴포넌트 설정 :  ./router/indxe.js ->  '../views/member/Join.vue' 으로 설정
* Join.vue(컴포넌트) : 
1.상단에 이미지 출력
2.페이지 타이틀 출력
3.Form컴포넌트로 회원가입 양식 제공("../../components/member/Form.vue"), mode:join으로 반환
* Form.vue(폼데이터 전송) : 
1.@submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행.
2.mode가 join이면 formData를 $join(/models/member.js)메서드로 실행.
3.join 성공시 라우터 '/login'으로 이동
* models/member.js : 멤버관련 메서드 라이브러
1.common/lib.js : $request(url, data, method)로 서버 전송



### 3. 로그인
* lib.js -> $loginInit() 메서드 실행 
 - 로그인 유지 처리 
1.store.js: apiURL설정, 회원정보설정(loginInit()메서드에서 result.data로 받음)

2.lib.js: $loginInit() 메서드 입력
(sotre에 회원정보가 없을시에 토큰으로 서버에 회원정보 요청, 로그인 완료시 스테이트의 member값은 요청한 회원데이터로 변경)

3.bootstrap.js: $loginInint() 메서드 created()싸이클로 처리


### 4. 뉴스 목록

### 5. 게시판

