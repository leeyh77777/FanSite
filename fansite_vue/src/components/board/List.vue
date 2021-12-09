<template>
    <div class='stit'>{{ title }}</div>
    <ul class='board_list'>
        <li :key="i" v-for="(li, i) in list" @click="goView(li.idx)">{{ li.subject }}</li>
    </ul>
</template>
<script>
import board from "../../models/board.js"
export default {
    mixins: [board],
    data() {
        return {
            title : "",
            list : [],
        };
    },
    methods : {
        goView(idx) {
            this.$router.push({ path : "/board/view", query : { idx }});
        }
    }
}
</script>