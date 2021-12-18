# IU FanSite
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

* App.vue: 루트 컴포넌트. 
```
1. '<router-view/>'로 랜더링
2. Vue 어플리케이션 id=app에 마운트
```

* ./router/index.js: 라우터설정 & 컴포넌트 설정 

* init.js : 
```
1.app.use로 공통저장소(저장소 생성후 데이터 유지)설정 항상 실행
2.app.mixin(lib)로 공통함수(컴포넌트에서 mixin 불러오지 않아도 사용가능)모듈 생성(앞에'$')
3.app.mixin(boot)로 로그인회원 정보 유지 메서드 실행
```

* common/store.js: 
```
1. vuex-persistedstate를 이용하여 localStorage에 저장하여 새로고침이 되어도 데이터를 유지
2. state()에서 apiURL 설정, member(로그인회원정보)를 setMember를 받아서 데이터를 유지
```
* common/lib.js: 공통 메서드 라이브러리

* bootstrap.js: 초기 공통 처리

### 2. 회원가입
* 라우팅 설정 : ./router/indxe.js -> '/join' 으로 설정

* 컴포넌트 설정 :  ./router/indxe.js ->  '../views/member/Join.vue' 으로 설정

* Join.vue : 컴포넌트 
```
1.상단에 이미지 출력
2.페이지 타이틀 출력
3.Form컴포넌트로 회원가입 양식 제공("../../components/member/Form.vue")
```

* Form.vue : 폼데이터 전송
``` 
1. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행.
2. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(AXIOS 사용위해)
3. mode가 join이면 $join(/models/member.js)메서드 실행.
4. join 성공시 라우터 '/login'으로 이동
```

* $join(data) : 회원가입 로직
```
1.common/lib.js : 
ㄱ. $request(url, data, method)메서드로 서버 전송(axios)
ㄴ. data.origin = "front" -> vue 내부 처리확인 용(vue.js 에서 정의된 라우터의 URL이 아닌경우 메인을 이동)

2.models/member.js/$join(data) 메서드 실행 :
ㄱ. await this.$request(this.requestURL, data, "POST");
ㄴ. 위의 $request(url, data, method)메서드로 서버전송(axios)
```

### 3. 회원정보 수정
* 라우팅 설정 : ./router/indxe.js -> '/my_info' 으로 설정

* 컴포넌트 설정 :  ./router/indxe.js ->  '../views/member/MyInfo.vue' 으로 설정

* MyInfo.vue : 컴포넌트 
```
1.상단에 이미지 출력
2.페이지 타이틀 출력
3.Form컴포넌트로 회원정보 수정 양식 제공("../../components/member/Form.vue")
4.v-if로 mode가 join이 아닐때는 아이디제외, submit 버튼 value 수정하기로 설정
```

* Form.vue : 폼데이터 전송
``` 
1. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행.
2. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(AXIOS 사용위해)
3. mode가 join아니면 $update(/models/member.js)메서드 실행.
4. upate 성공시 라우터 memPw, memPwRe 'value'를 비워준다.
```

* $update(data) : 회원정보 수정
```
1.common/lib.js : 
ㄱ. $request(url, data, method)메서드로 서버 전송(axios)
ㄴ. data.origin = "front" -> vue 내부 처리확인 용(vue.js 에서 정의된 라우터의 URL이 아닌경우 메인을 이동)

2.models/member.js/$update(data) 메서드 실행 :
ㄱ. token값 새로고침
ㄱ. await this.$request(this.requestURL, data, "POST");
ㄴ. 위의 $request(url, data, method)메서드로 서버전송(axios)
```


### 4. 로그인
* 라우팅 설정 : ./router/indxe.js -> '/login' 으로 설정

* 컴포넌트 설정 :  ./router/indxe.js ->  '../views/member/Login.vue' 으로 설정

* Login.vue : 컴포넌트 
```
1.상단에 이미지 출력
2.페이지 타이틀 출력
3.form tag 출력
```

* form 데이터 전송
```
1. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행
2. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(AXIOS 사용위해)
3. $login 성공시 라우터 '/'로 이동(메인페이지)
```

* $login(data) : 로그인 로직
```
1.common/lib.js : 
ㄱ. $request(url, data, method)메서드로 서버 전송(axios)
ㄴ. data.origin = "front" -> vue 내부 처리확인 용(vue.js 에서 정의된 라우터의 URL이 아닌경우 메인을 이동)

2.models/member.js/$login(data) :
ㄱ. 폼데이터에 'mode: login' 추가 
ㄴ. await this.$request(this.requestURL, data, "POST");
ㄷ. 위의 $request(url, data, method)메서드로 서버전송(axios)
ㄹ. 로그인 성공시 세션스토리지에 'key:sessionId, value:token' 추가
ㅁ. 로그인 성공시 $loginInit() 실행.
```

* $loginInit() : 로그인 유지 처리 로직
```
1.lib.js/$loginInit() 메서드 실행 :
ㄱ. sotre에 회원정보가 없을시에 토큰으로 서버에 회원정보 요청
ㄴ. 로그인 완료시 스테이트의 member값은 요청한 회원데이터로 변경

2. 로그인 성공시 this.$store.commit('setMember', result.data)
=> member 데이터를 로컬스토리지에 저장

3.bootstrap.js: $loginInint() 메서드 created()싸이클로 처리
```

### 5. 로그아웃

### 6. 뉴스

### 7. 게시판

