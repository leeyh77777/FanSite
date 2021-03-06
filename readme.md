# IU FanSite
#### 링크
* NodeJS로 구현된 FanSite([여기를 클릭](http://dydhyun.cafe24app.com/))
* PHP로 구현된 FanSite([여기를 클릭](http://dydhyun.cafe24.com/))
* 사이트 소개([여기를 클릭](https://github.com/leeyh77777/FanSite#%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%86%8C%EA%B0%9C))
* Vue.Js 기술문서([여기를 클릭](https://github.com/leeyh77777/FanSite#vuejs-%ED%95%B5%EC%8B%AC%EA%B8%B0%EC%88%A0))
* Node.Js 기술문서([여기를 클릭](https://github.com/leeyh77777/FanSite/tree/main/fansite_node#iu-fansite---nodejs))
* PHP 기술문서([여기를 클릭](https://github.com/leeyh77777/FanSite/tree/main/fansite_PHP#iu-fansite---php))
- - -
## 사이트 소개

### 1. 서비스 내용 

:one: IU 프로필

:two: IU 뉴스

:three: 회원들 간 커뮤니케이션 제공

### 2. 적용기술
<img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/PHP-4479A1?style=for-the-badge&logo=php&logoColor=white">

### 3. 각 페이지별 소개

:one: Login : ID 와 Password로 로그인 구현
![login](https://user-images.githubusercontent.com/86813278/147775164-d063d36c-6ae1-4087-89d7-615e43448b01.png)

:two: Join : 회원가입 구현(아이디, 비밀번호, 회원명, 휴대전화번호)
![join](https://user-images.githubusercontent.com/86813278/147775567-0df3c548-8a3f-4ee0-8217-11ce04584ac8.png)

:three: 아이유 프로필(이름, 생년월일, 키, 혈액형, sns 링크)
![profile](https://user-images.githubusercontent.com/86813278/147775709-bb75e1cc-fc9a-4011-9951-e660c53d0dcc.png)

:four: News : 아이유 뉴스 카테고리별로 목록 구현(가수, 배우, 기타)
![news1](https://user-images.githubusercontent.com/86813278/147775874-79516d1c-a9bd-4f4a-b19f-dd5614a58f0f.png)

:five: News : 아이유 뉴스 보기
![news2](https://user-images.githubusercontent.com/86813278/147775990-dc415681-0ba4-423a-93cf-d87d14f8bc86.png)

:six: 회원정보 변경(비밀번호, 이름, 휴대전화번호 변경)
![myinfo](https://user-images.githubusercontent.com/86813278/147776077-934838bb-2ff5-4041-8ba9-77acaa2e8d5e.png)

:seven: 게시판 목록
![board1](https://user-images.githubusercontent.com/86813278/147776264-d102e377-3dfd-4d15-991d-ceef8a6ba96f.png)

:eight: 게시판 보기
![board2](https://user-images.githubusercontent.com/86813278/147776355-808f2938-5dd0-440e-9d67-a73fc2354291.png)

## Vue.js 핵심기술

### 1. 페이지 초기화
* main.js([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/main.js))
: 페이지 초기화 설정

```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import init from './init.js'

const app = createApp(App) /** 어플리케이션 인스턴스 생성 */
init(app) /** 공통 저장소, 함수 설정 */
app.use(router).mount('#app') /** App.vue /router/index.js로 라우터 설정, id=app에 마운트 */
```

* App.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/App.vue))
: 루트 컴포넌트. 
```
1. '<router-view/>'로 랜더링
2. Vue 어플리케이션 id=app에 마운트
```

* ./router/index.js([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js))
: 라우터설정 & 컴포넌트 설정 

* init.js([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/init.js))
```
1.app.use로 공통저장소(저장소 생성후 데이터 유지)설정 항상 실행
2.app.mixin(lib)로 공통함수(컴포넌트에서 mixin 불러오지 않아도 사용가능)모듈 생성(앞에'$')
3.app.mixin(boot)로 로그인회원 정보 유지 메서드 실행
```

* common/store.js([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/common/store.js))
```
1. vuex-persistedstate를 이용하여 localStorage에 저장하여 새로고침이 되어도 데이터를 유지
2. state()에서 apiURL 설정, member(로그인회원정보)를 setMember를 받아서 데이터를 유지
```
* common/lib.js([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/common/lib.js))
: 공통 메서드 라이브러리
```
1. $request(axios로 비동기 통신)
	ㄱ. FormData JSON으로 변경
	ㄴ. data.origin = "front" -> vue 내부 처리확인 용(vue.js 에서 정의된 라우터의 URL이 아닌경우 메인으로 이동)
	ㄷ. 매개변수 HttpMethod, 요청 url,  JSON Data를 비동기로 통신한다.

2. $showMessage(응답 message 알림)

3. $loginInit(로그인 유지) 
	ㄱ. 변수 expires는 멤버의 tokenExpires를 getTime()으로 밀리초로 반환
	ㄴ. 현재의 밀리초(Date.now())가 expires보다 커지면 $logout()로 로그아웃 처리
	ㄷ. 세션아이디로 토큰을 가져오고 토큰으로 member Data를 가져온다
	ㄹ. 가져온 member Data를 $store의 setMember의 대입해 로컬스토리지 vuex의 member의 저장
```

* bootstrap.js([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/bootstrap.js))
: 초기 공통 처리

### 2. 회원가입
* 라우팅 설정([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L15))
: ./router/index.js -> '/join' 으로 설정

* 컴포넌트 설정([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L3))
:  ./router/index.js ->  '../views/member/Join.vue' 으로 설정

* Join.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/member/Join.vue))
: 컴포넌트 
```
1.상단에 이미지 출력
2.페이지 타이틀 출력
3.Form컴포넌트로 회원가입 양식 제공("../../components/member/Form.vue")
```

* Form.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/components/member/Form.vue))
: 폼데이터 전송
``` 
1. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행.
2. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(axios 사용위해)
3. mode가 join이면 $join(/models/member.js)메서드 실행.
4. join 성공시 라우터 '/login'으로 이동
```

* $join(data)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/member/Join.vue))
: 회원가입 로직
```
1. models/member.js/$join(data) 메서드 실행
2. $request(url, data, method)메서드로 서버데이터 요청(axios)
```

### 3. 회원정보 수정
* 라우팅 설정 : ./router/index.js -> '/my_info' 으로 설정

* 컴포넌트 설정 :  ./router/index.js ->  '../views/member/MyInfo.vue' 으로 설정

* MyInfo.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/member/MyInfo.vue))
: 컴포넌트
```
1.상단에 이미지 출력
2.페이지 타이틀 출력
3.Form컴포넌트로 회원정보 수정 양식 제공("../../components/member/Form.vue")
4.v-if로 mode가 join이 아닐때는 아이디제외, submit 버튼 value 수정하기로 설정
```

* Form.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/components/member/Form.vue))
: 폼데이터 전송
``` 
1. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행.
2. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(axios 사용위해)
3. mode가 join아니면 $update(/models/member.js)메서드 실행.
4. upate 성공시 라우터 memPw, memPwRe 'value'를 비워준다.
```

* $update(data)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/member.js#L24))
: 회원정보 수정
```
1.common/lib.js : 
ㄱ. $request(url, data, method)메서드로 서버 데이터 요청(axios)
ㄴ. data.origin = "front" -> vue 내부 처리확인 용(vue.js 에서 정의된 라우터의 URL이 아닌경우 메인을 이동)

2.models/member.js/$update(data) 메서드 실행 :
ㄱ. token값 새로고침
ㄴ. await this.$request(this.requestURL, data, "POST");
ㄷ. 위의 $request(url, data, method)메서드로 서버 데이터 요청(axios)
```


### 4. 로그인
* 라우팅 설정([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L20))
: ./router/index.js -> '/login' 으로 설정

* 컴포넌트 설정([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L5))
: ./router/index.js ->  '../views/member/Login.vue' 으로 설정

* Login.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/member/Login.vue))
: 컴포넌트 
```
1.상단에 이미지 출력
2.페이지 타이틀 출력
3.form tag 출력
```

* form 데이터 전송([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/member/Login.vue#L32))
```
1. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행
2. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(AXIOS 사용위해)
3. $login(formData) 메서드 실행 해서 로그인
3. $login 성공시 라우터 '/'로 이동(메인페이지)
```

* $login(data)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/member.js#L39))
: 로그인 로직
```
1.common/lib.js : 
ㄱ. $request(url, data, method)메서드로 서버 데이터 요청(axios)
ㄴ. data.origin = "front" -> vue 내부 처리확인 용(vue.js 에서 정의된 라우터의 URL이 아닌경우 메인을 이동)

2.models/member.js/$login(data) :
ㄱ. 폼데이터에 'mode: login' 추가 
ㄴ. await this.$request(this.requestURL, data, "POST");
ㄷ. 위의 $request(url, data, method)메서드로 서버 데이터 요청(axios)
ㄹ. 로그인 성공시 세션스토리지에 'key:sessionId, value:token' 추가
ㅁ. 로그인 성공시 $loginInit() 실행.
```

* $loginInit()([여기를 클릭](<https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/common/lib.js#L56>))
: 로그인 유지 처리 로직
```
1.lib.js/$loginInit() 메서드 실행 :
ㄱ. sotre에 회원정보가 없을시에 토큰으로 서버에 회원정보 요청
ㄴ. 로그인 완료시 스테이트의 member값은 요청한 회원데이터로 변경

2. 로그인 성공시 this.$store.commit('setMember', result.data)
=> member 데이터를 로컬스토리지에 저장

3.bootstrap.js: $loginInint() 메서드 created()싸이클로 처리
```

### 5. 로그아웃
* 라우팅 설정([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L25))
: ./router/index.js -> '/logout' 으로 설정

* 컴포넌트 설정([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L6))
: ./router/index.js ->  '../views/member/Logout.vue' 으로 설정

* Logout.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/member/Logout.vue))
: 컴포넌트 
```
1.created() 라이프사이클에 아래 메서드 실행(vue 객체생성 dom추가 되기전)
2.$logout() 메서드 실행(common/lib.js)
3.$router.push({ path : "/login" }) : '/login' url 이동
```

* $logout()([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/common/lib.js#L81))
: 로그 아웃
```
1. this.$store.commit('setMember', null); -> 로컬스토리지에 member 비워줌.
2. sessionStorage.removeItem('sessionId'); -> 세션스토리지에 sessionId 삭제
```

### 6. 파일 전송
* 게시판 or 뉴스 Form 컴포넌트에서 이미지 추가시 $sendFile(file)메소드로 파일 전송

* $sendFile(file)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/common/lib.js#L94))
```
1. url에 "/file" 추가
2. 파일 유무 확인후 에러처리
3. readAsDataURL()메소드로 파일의 URL을 불러온다.
4. readAsDataURL 성공시 onload가 실행 되어 url에서 'base64,'를 제거 하여 data에 바인딩
5. axio로 서버에 요청(mode : upload, filename, filetype, data : base64)
6. 백엔드에서 요청데이터로 업로드후 imageUrl을 추가 하여 파일정보 전송
7. 게시판에서 이미지 업로드시 "<img src='" + this.$store.state.apiURL + data.data.imageUrl + "'>"로 이미지추가
```

### 7. 뉴스
* 라우팅 설정([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L35))

:one: ./router/index.js -> 뉴스 추가 : '/news/add' 으로 설정

:two: ./router/index.js -> 뉴스 보기 : '/news/view' 으로 설정

:three: ./router/index.js -> 뉴스 목록 : '/news/list' 으로 설정

:four: ./router/index.js -> 뉴스 수정 : '/news/edit' 으로 설정


* 컴포넌트 설정([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L37))

:one: ./router/index.js -> 뉴스 추가 : '../views/news/Add.vue' 으로 설정

:two: ./router/index.js -> 뉴스 보기 : '../views/news/View.vue' 으로 설정

:three: ./router/index.js -> 뉴스 목록 : '../views/news/List.vue' 으로 설정

:four: ./router/index.js -> 뉴스 수정 : '../views/news/Edit.vue' 으로 설정

#### 뉴스 추가
* Add.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/news/Add.vue))
: 뉴스 추가 컴포넌트 
```
1.Form컴포넌트로 뉴스추가 양식 링크("../../components/news/Form.vue")
2.아래 조건문으로 로그인이 되지 않았을시에 URL "/login"으로 이동
	created() {
        if (!this.$isLogin()) {
            return this.$router.push({ path : "/login"});
        }
    }
```

* Form.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/components/news/Form.vue))
: Form데이터 전송(./components/news/Form.vue)
``` 
1. Content @tiny 에디터 사용
(참조: https://www.tiny.cloud/docs/general-configuration-guide/basic-setup/#basicconfigurationexample)
2. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행.
2. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(axios 사용위해)
3. mode가 add(기본값)이면 $addNews(/models/news.js)메서드 실행.
```

* addNews(data)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/news.js#L9))
: axios로 서버에 데이터 INSERT 요청 (data: formData)

#### 뉴스 보기
* View.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/news/View.vue))
: 뉴스 보기 컴포넌트
```
1. const idx = this.$route.query.idx;	// idx 쿼리스트링으로 처리
2. const result =  await this.$get(idx)	// $get메서드로 뉴스데이터를 가져온다.
3. if (result.success) {				// 뉴스데이터를 가져오면  view 객체에 데이터 이동
	 this.view = result.data;
   }
----------------------------------------------------------------------------
4. <dd class=" bg_wh">{{ view.subject }}</dd>	// 뉴스데이터에 subject를 렌더링
5. <div v-html="view.contentHtml" class='news_content'></div>	// 뉴스데이터에 content를 렌더링
```

* $get(idx)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/news.js#L35))
: axios로 서버에 데이터 요청 (mode: "get", idx : parameter)

#### 뉴스 목록
* List.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/news/List.vue))
: 뉴스 목록 view 
```
1.List컴포넌트로 뉴스목록 랜더링("../../components/news/List.vue")
2. <input class="type_btn" type="radio" id="check_actor" name="newsType" value="actor" v-model="checked">
// v-model로 클릭시 return data checked에 value값 추가 
3. <div class="actor" v-show="checked.includes('actor')"> 
        <List status="actor" />		// checked 에 value(actor)가 포함되어 있으면 true로 display = none 해제
    </div>
```

* List.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/components/news/List.vue))
: 뉴스 목록 컴포넌트
```
1. props로 view의 status를 전달받고, switch case로 status 선택
2. this.list = await this.$getList(this.status)  // $getList(this.status)로 this.list에 뉴스목록 서버에 요청
3. <li :key="i" v-for="(li, i) in list" @click="goView(li.idx)">
	{{ li.subject }}</li>	// 뉴스목록에 subject 렌더링, 클릭시 해당 idx로 view로 이동
```

* $getList(status)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/news.js#L25))
: axios로 서버에 데이터 요청 (mode: "getList", status : parameter)

#### 뉴스 수정
* Edit.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/news/Edit.vue))
: 뉴스 수정 view 
```
1. const idx = this.$route.query.idx;	// idx 쿼리스트링으로 처리
2. const result =  await this.$get(idx)	// $get메서드로 뉴스데이터를 가져온다.
3. if (result.success) {				// 뉴스데이터를 가져오면  Form 컴포넌트에 updateData(data)로 수정할 데이터 반영
	 this.$refs.frm.updateData(result.data);
   }
4.Form 컴포넌트로 뉴스수정 양식 링크_mode: "edit"("../../components/news/Form.vue")
```

* Form.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/components/news/Form.vue))
: Form데이터 전송(./components/news/Form.vue)
``` 
1. Content @tiny 에디터 사용
(참조: https://www.tiny.cloud/docs/general-configuration-guide/basic-setup/#basicconfigurationexample)
2. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행.
2. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(axios 사용위해)
3. mode가 add가 아닐때는 $editNews(formData)메서드 실행
4. idx = this.$route.query.idx; 로 idx는 쿼리스트링 idx로 가져온다.
5. <input type="file" @change='addImage($event);'>
```

* $getList(status)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/news.js#L25))
: axios로 서버에 데이터 요청 (mode: "getList", status : parameter)

#### 뉴스 삭제
* View.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/news/View.vue#L13))
: 뉴스 삭제 버튼_deleteNews() 메서드 실행

* deleteNews()([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/news/View.vue#L49))
: $deleteNews(idx) 메서드 실행 후 성공시 /news/list url로 이동

* $delteNews(idx)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/news.js#L19))
: : axios로 DB서버에 데이터 DELETE 요청 (mode: "delete", idx : parameter)

### 8. 게시판
* 라우팅 설정([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L55))

:one: ./router/index.js -> 게시판 추가 : '/board/add' 으로 설정

:two: ./router/index.js -> 게시판 목록 : '/board' 으로 설정

:three: ./router/index.js -> 게시판 보기 : '/board/view' 으로 설정

:four: ./router/index.js -> 게시판 수정 : '/board/edit' 으로 설정


* 컴포넌트 설정([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/router/index.js#L57))

:one: ./router/index.js -> 게시판 추가 : '../views/board/Add.vue' 으로 설정

:two: ./router/index.js -> 게시판 목록 : '../views/board/List.vue' 으로 설정

:three: ./router/index.js -> 게시판 보기 : '../views/board/View.vue' 으로 설정

:four: ./router/index.js -> 게시판 수정 : '../views/board/Edit.vue' 으로 설정

#### 게시판 추가
* Add.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/board/Add.vue))
: 게시판 추가 컴포넌트 
```
1.Form컴포넌트로 게시판추가 양식 링크("../../components/board/Form.vue")
2.아래 조건문으로 로그인이 되지 않았을시에 URL "/login"으로 이동
	created() {
        if (!this.$isLogin()) {
            return this.$router.push({ path : "/login"});
        }
    }
```

* Form.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/components/board/Form.vue))
: Form데이터 전송(./components/board/Form.vue)
``` 
1. data poster, subject 텍스트로 입력
2. data Content @tiny 에디터 사용하여 입력
(참조: https://www.tiny.cloud/docs/general-configuration-guide/basic-setup/#basicconfigurationexample)
2. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행.
2. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(axios 사용위해)
3. mode가 add(기본값)이면 $addNews(/models/news.js)메서드 실행.
```

* add(data)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/board.js#L9))
: axios로 서버에 데이터 INSERT 요청 (data: formData)

#### 게시판 목록
* list.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/board/list.vue))
: 게시판 목록 view 
```
1. List컴포넌트로 뉴스목록 랜더링("../../components/board/List.vue")
2. 뉴스목록 헤더 출력
```

* List.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/components/board/List.vue))
: 게시판 목록 컴포넌트
```
1. this.list = await this.$get()  // $get()로 this.list에 게시판 목록 서버에 요청
2. <tr :key="i" v-for="(li, i) in list" @click="goView(li.idx)" class="board_content">
	// for...in으로 list 출력
3. @click="goView(li.idx)	// 게시판 목록 선택시 해당 idx로 이동
```

* $get()([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/board.js#L25))
: axios로 서버에 데이터 요청 (mode: "list")

#### 게시판 보기
* View.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/board/view.vue))
: 게시판 보기 컴포넌트
```
1. const idx = this.$route.query.idx;	// idx 쿼리스트링으로 처리
2. const result =  await this.$view(idx)	// $view메서드로 게시판 데이터를 가져온다.
3. if (result.success) {				// 뉴스데이터를 가져오면  board 객체에 데이터 이동
	 this.board = result.data;
   }
----------------------------------------------------------------------------
4. <dd class=" bg_wh">{{ board.subject }}</dd>	// 게시판데이터에 subject를 렌더링
5. <dd>글쓴이 : {{ board.poster }}</dd>	// 게시판데이터에 poster 렌더링
6. <dd>등록일 : {{ board.regDt }}</dd>	// 게시판데이터에 regDt 렌더링
7. <div v-html="board.contentHtml" class='content'></div>	// 게시판 데이터에 content를 렌더링
```

* $view(idx)([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/board.js#L34))
: axios로 서버에 데이터 요청 (mode: "view", idx: parameter)

#### 게시판 수정
* Edit.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/board/Edit.vue))
: 게시판 수정 view 
```
1. const idx = this.$route.query.idx;	// idx 쿼리스트링으로 처리
2. const result =  await this.$view(idx)	// $view메서드로 게시판데이터를 가져온다.
3. if (result.success) {				// 게시판데이터를 가져오면  Form 컴포넌트에 updateData(data)로 수정할 데이터 반영
	 this.$refs.frm.updateData(result.data);
   }
4.Form 컴포넌트로 게시판수정 양식 링크_mode: "edit"("../../components/board/Form.vue")
```

* Form.vue([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/views/board/Edit.vue))
: Form데이터 전송(./components/news/Form.vue)
``` 
1. Content @tiny 에디터 사용
(참조: https://www.tiny.cloud/docs/general-configuration-guide/basic-setup/#basicconfigurationexample)
2. @submit="formSubmit($event)로 데이터입력후 submit 클릭시 해당 메서드 실행.
3. e.preventDefault()로 데이터 전송을 막고 FormData 생성.(axios 사용위해)
4. mode가 add가 아닐때는 $edit(formData)메서드 실행
5. idx = this.idx; 로 쿼리스트링 idx로 가져온다.
```

* $edit()([여기를 클릭](https://github.com/leeyh77777/FanSite/blob/main/fansite_vue/src/models/board.js#L14))
: axios로 서버에 데이터 요청