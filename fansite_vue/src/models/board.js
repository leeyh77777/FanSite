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
        /** 게시글 총 갯수 */
        async $count() {
            const data = {
                mode: "count",
            };
            const result = await this.$request(this.requrestURL, data, "POST");
            const total = result.data || [];
            return total;
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
        /** 페이지네이션 */
        async $pagination() {
            // 마지막페이지 설정(현재페이지가 마지막페이지이상 이면 마지막페이지설정)
            if (this.page > this.lastPage) {
                this.page = this.lastPage;
            }

        }
    }
}