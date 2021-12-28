export default {
    data() {
        return {
            requestURL : this.$store.state.apiURL + "/board",
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
            const url = this.$route.query;
            const data = {
                mode : "list",
                page : url.page || 1,
            };
            const result = await this.$request(this.requestURL, data, "POST");
            const list = result.data || [];
            console.log("list: ", list);
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