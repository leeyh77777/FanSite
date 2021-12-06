# IU FanSite
* PHP로 구현된 FanSite (<http://dydhyun.cafe24.com/>)
* NODE.JS로 구현된 FanSite (<http://dydhyun.cafe24app.com/>)
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
* main.js 로 페이지 초기화 설정
```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import init from './init.js'

const app = createApp(App)
init(app)
app.use(router).mount('#app')
/** app.use(router).mount(#app) -> 라우터 인스턴스 생성 app.vue에 마운트 */
```

### 2. 회원가입

### 3. 로그인

### 4. 뉴스 목록

### 5. 게시판

