export default {
    data() {
        return {
            requestURL : this.$store.state.apiURL + "/news",
        };
    },
    methods : {
        /** 뉴스 추가 */
        async $addNews(data) {
           const result = await this.$request(this.requestURL, data, "POST");
           return result;
        },
        /** 뉴스 수정 */
        async $editNews(data) {
            const result = await this.$request(this.requestURL, data, "POST");
            return result;
        },
        /** 뉴스 삭제 */
       async $deleteNews(idx) {
            const data = { mode : "delete", idx };
            const result = await this.$request(this.requestURL, data, "POST");
            return result;
        },
        /** 뉴스 목록  */
        async $getList(status) {
            const data = { mode : "getList", status };
            const result = await this.$request(this.requestURL, data, "POST");
            const list = result.data || [];
            return list;
        },
        /**
         * 뉴스 내용 조회
         * @param {*} idx 
         */
        async $get(idx) {
            const data = {
                mode : "get",
                idx,
            };
            const result = await this.$request(this.requestURL, data, 
                "POST");
            return result;
        }
    }
}