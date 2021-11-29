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
            default : "Actor IU",
        }
    },
    async mounted() {
        switch(this.status) {
            case "actor" : 
                this.title = "Actor IU";
                break;
            case "singer" : 
                this.title = "Singer IU";
                break;
            default : 
                this.title = "etc";
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