export default {
    data() {
        return {
            requestURL : this.$store.state.apiURL + "/board/index.php",
        };
    },
    methods : {
        /** 게시글 추가 */
        async $add(data) {
            const result = await this.$request(this.requestURL, data, "POST");
            return result;
        },
        /** 게시글 수정 */
        async $edit(data) {
            const result = await this.$request(this.requestURL, data, "POST");
            return result;
        },
        /** 게시글 삭제 */
        async $delete(idx) {
            const data = { mode : "delete", idx };
            const result = await this.$request(this.requestURL, data, "POST");
            return result;
        },
        /** 게시글 목록() */
        async $get() {
            const data = {
                mode : "list"
            };
            const result = await this.$request(this.requestURL, data, "POST");
            const list = result.data || [];
            return list;
        },
        /** 게시글 내용 조회 */
        async $view(idx) {
            const data = {
                mode : "view",
                idx,
            };
            const result = await this.$request(this.requestURL, data, "POST");
            return result;
        },
    }
}