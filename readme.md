# IU FanSite
## 개요
### 1. 서비스 내용 
```

```
* PHP로 구현된 FanSite (<http://dydhyun.cafe24.com/>)
* NODE.JS로 구현된 FanSite (<http://dydhyun.cafe24app.com/>)
2. 적용기술

```

		
```

3. 각 페이지별 소개

```

```
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
