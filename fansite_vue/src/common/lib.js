import axios from 'axios'

export default {
    methods : {
        async $request(url, data, method) {
            method = method || "GET";
            if (data && data instanceof FormData) {
                data = this.$formDataToJson(data);
            }
            
            if (typeof data != 'object') {
                return;
            }

            if (this.$isLogin()) {
                const member = this.$getMember();
                data.memNo = member.memNo;
            }
            
            data.origin = "front";
            try {
                const result = await axios({
                    method,
                    url,
                    data,
                });
                return result.data;
            } catch (err) {
                console.error(err);
                return false;
            }
        },
        /**
         * FormData 형식 데이터 -> json 
         * @param {*} data 
         */
        $formDataToJson(data) {
            const json = {};
            for (let field of data.entries()) {
                json[field[0]] = field[1];
            }
            return json;
        },
        $showMessage(obj, message) {
            obj.message = message;
            const ref = obj.$refs.popup;
            if(ref) {
                ref.isHide = false;
            }
        },
        /**
         * 로그인 회원 정보 유지 
         * 
         */
        async $loginInit() {
            
            if (this.$store.state.member) {
                const member = this.$getMember();
               /** 
                 * SPA 및 vuex persistent 사용시 데이터 갱신이 안되므로 
                 * node api 서버 체크 외에 vue에서도 만료시간 체크 
                 * 만료시간 경과시 로그아웃 처리 
                 * 
                 */
                const expires = new Date(member.tokenExpires).getTime() - (60 * 60 * 1000 * 9);
                if (Date.now() > expires) {
                   await this.$logOut();
                }
                return;
            }
            
            // 회원 정보가 없는 경우만 서버에 정보 요청 
            const token = sessionStorage.getItem("sessionId");
            if (!token) {
                return;
            }
           
            const apiURL = this.$store.state.apiURL + "/member";
            const data = { mode : "get_member", token };
            const result = await this.$request(apiURL, data, "POST");
            
            if (result.success) {
                this.$store.commit('setMember', result.data);
            }
        },
        /** 로그인 체크 */
        $isLogin() {
            return this.$store.state.member?true:false;
        },
        /** 로그아웃 처리 */
        $logOut() {
            this.$store.commit('setMember', null);
            sessionStorage.removeItem('sessionId');
        },
        /** 로그인 회원 정보 */
        $getMember() {
            return this.$store.state.member;
        },
        /** 세션 스토리지 sessionId */
        $getToken() {
            return sessionStorage.getItem("sessionId");
        },
        /** 파일 업로드  */
        $sendFile(file) {   
            const apiURL =  this.$store.state.apiURL + "/file";
            return new Promise((resolve, reject) => {
                if (!file) {
                    reject(new Error("파일이 존재하지 않습니다."));
                    return;
                }
                
                 const reader = new FileReader();
                reader.onload = function() {
                    if (reader.result) {
                        const base64 = reader.result.split("base64,")[1];
                        const data = {
                            mode : "upload",
                            fileName : file.name,
                            fileType : file.type,
                            data : base64,
                        };
                        
                        axios({
                            method : "POST",
                            url : apiURL,
                            data,
                        })
                        .then((result) => {
                            resolve(result.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                    }
                };

                reader.onerror = function(err) {
                    reject(err);
                };

                reader.readAsDataURL(file);
            });
        }
    }
}