<template>
<PageTitle>News List</PageTitle>
<router-link to="/news/add" class='add_news'>Add News</router-link>

<List status="actor" />
<List status="singer" />
<List status="etc" />
</template>
<script>
import PageTitle from "../../components/PageTitle.vue"
import List from "../../components/news/List.vue"
export default {
    components : {PageTitle, List},
    created() {
        if (!this.$isLogin() && this.$getToken()) {
            location.reload();
        }
    }
    
}
</script>