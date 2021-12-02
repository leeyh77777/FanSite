# IU FanSite
* PHP로 구현된 FanSite (<http://dydhyun.cafe24.com/>)
* NODE.JS로 구현된 FanSite (<http://dydhyun.cafe24app.com/>)
## 개요
### 1. 서비스 내용 
1. IU 프로필
2. IU 뉴스
3. 회원들 간 커뮤니케이션 제공

### 2. 적용기술


### 3. 각 페이지별 소개

## 핵심기술
### 1. 페이지 초기화
main.js 로 페이지 초기화 설정
const app = createApp(App) ->  vue 인스턴스생성
init(app)  -> init.js 에 초기화 설정 주입
app.use(router).mount(#app)  -> 라우터 인스턴스 생성 app.vue에 마운트
```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import init from './init.js'

const app = createApp(App)
init(app)
app.use(router).mount('#app')
```
### 2. 회원가입

### 3. 로그인

### 4. 뉴스 목록

### 5. 게시판

