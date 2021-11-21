<template>
    <div class='stit'>{{ title }}</div>
    <ul class='news_list'>
        <li :key="i" v-for="(li, i) in list" @click="goView(li.idx)">{{ li.subject }}</li>
    </ul>
</template>
<script>
import news from "../../models/news.js"
export default {
    mixins: [news],
    data() {
        return {
            title : "",
            list : [],
        };
    },
    props : {
        status : {
            type : String,
            default : "etc",
        }
    },
    async mounted() {
        switch(this.status) {
            case "actor" : 
                this.title = "연기자 아이유";
                break;
            case "singer" : 
                this.title = "가수 아이유";
                break;
            default : 
                this.title = "기타";
        }
        this.list = await this.$getList(this.status);
    },
    methods : {
        goView(idx) {
            this.$router.push({ path : "/news/view", query : { idx }});
        }
    }
}
</script>