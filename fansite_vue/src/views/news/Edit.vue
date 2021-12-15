<template>
    <PageTitle>뉴스 수정</PageTitle>
    <Form :mode="mode" ref="frm" />
</template>
<script>
import PageTitle from "../../components/PageTitle.vue"
import Form from "../../components/news/Form.vue"
import news from "../../models/news.js"
export default {
    components: { PageTitle, Form },
    mixins: [news],
    data() {
        return {
            mode : "edit",
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
            this.$refs.frm.updateData(result.data);
        }
    }
}
</script>