<template>
    <PageTitle>게시글 수정</PageTitle>
    <Form :mode="mode" :board="board" />
</template>
<script>
import PageTitle from "../../components/PageTitle.vue"
import Form from "../../components/board/Form.vue"
import board from "../../models/board.js"
export default {
    components: { PageTitle, Form},
    mixins: [board],
    data() {
        return {
            mode : "edit",
            board : {},
        };
    },
    created() {
    if (!this.$isLogin()) {
        return this.$router.push({ path : "/login"});
    }
    },
    async mounted() {
        const idx = this.$route.query.idx;
        const result = await this.$get(idx);
        if (result.success) {
            this.news = result.data;
        }
    }
}
</script>