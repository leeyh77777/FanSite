<template>
    <PageTitle>뉴스 등록</PageTitle>
    <Form />
</template>
<script>
import PageTitle from "../../components/PageTitle.vue"
import Form from "../../components/news/Form.vue"
export default {
    components: { PageTitle, Form },
    created() {
        if (!this.$isLogin()) {
            return this.$router.push({ path : "/login"});
        }
    }
}
</script>