<template>
<img class="news_img" src="../../assets/news.png">
<div class="n_tit">Press</div>

<List status="actor" />
<List status="singer" />
<List status="etc" />
</template>
<script>
import List from "../../components/news/List.vue"
export default {
    components : {List},
    created() {
        if (!this.$isLogin() && this.$getToken()) {
            location.reload();
        }
    }
    
}
</script>