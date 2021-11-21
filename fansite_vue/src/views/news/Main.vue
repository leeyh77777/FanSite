<template>
    <PageTitle>뉴스목록</PageTitle>
    <router-link to="/news/add">뉴스추가</router-link>
</template>
<script>
import PageTitle from "../../components/PageTitle.vue"
export default {
    components : {PageTitle},
    created() {
        if (!this.$isLogin()) {
            //return this.$router.push({ path : "/login"});
        }
    },
}
</script>