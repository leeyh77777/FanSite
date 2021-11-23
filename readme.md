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
### 1. 회원가입
동작 방식에 대한 설명...
```
if (!data.memId) {
			throw new Error('아이디를 입력하세요.');
		}
		
		if (!data.memPw) {
			throw new Error('비밀번호를 입력하세요.');
		}
		
		// 회원정보 조회
		const info = await this.get(data.memId, true);
		if (!info) {
			throw new Error("존재하지 않는 회원입니다.");
		}
		
		// 비밀번호 체크 
		const match = await bcrypt.compare(data.memPw, info.memPw);
		if (!match) {
			throw new Error('비밀번호가 일치하지 않습니다.');
		}
		
		// 토큰 -> 로그인한 회원 정보를 조회, 유효시간 
		const token = await this.generateToken(data.memId);
		return token;
	},
	
		for (let key in required) {
			if (!data[key] || (data[key] && data[key].trim() == "")) {
				throw new Error(required[key]);
			}
		}
```
### 2. 로그인

### 3. 작업 목록


개요 
1. 칸반보드 서비스의 내용 
2. 칸반보드에 들어간 기술 
  프론트엔드 vue.js가 역할 분담 
  백앤드는 다양하게 node.js, PHP로 구성...   CORS 3. 결과물 각 페이지 별 기능 설명(+결과물 확인 URL)

핵심 기술
1. 회원가입, 로그인프론트엔드 회원가입 양식 -> 백엔드인 node.js, PHP에서 처리하는부분 설명 로그인 유지를 어떤 방식으로 했는지 설명   설명시에 핵심 기술에 대한 소스 캡쳐 + 설명 + 기술이 동작하는 흐름예) 로그인 프론트앤드(vue.js) 로그인 양식 회원데이터 전송 -> 백앤드에서 검증 -> 유효시간이 있는 토큰발급 -> 프론트엔드(vue.js)전송 -> 로그인 유지 처리를 위해 sessionStorage에 sessionId 형태로 토큰을 저장 -> sessionId 값을 bootStrap mixin에서 로그인 유지 처리     - sessionId 값이 sessionStorage에 있으면 -> 백엔드 서버에 회원 정보 요청       -> 응답을 받으면 -> vuex 중앙 스토리지 member 값을 업데이트 해줌       -> 로그인       -> 페이지 새로고침시 데이터 유지 X -> vuex-persistedstate 작업 목록 – CRUD    - Node.js, PHP의 작업 처리 방식을 비교하면서 유사점, 차이점 등을 같이 나열     

