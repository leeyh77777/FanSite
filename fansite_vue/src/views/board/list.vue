<template>
    
<div class="n_tit">Board</div>
<button type="button" @click="goLink('add')">추가</button>
<List />
</template>
<script>
import List from "../../components/board/List.vue"
export default {
    components : { List },
    data() {
        return {
            checked: [],
        }
    },
    created() {
        if (!this.$isLogin() && this.$getToken()) {
            location.reload();
        }
    },
    methods : {
            goLink(link) {
                this.$router.push({ path : "/board/" + link, query : { idx : this.idx }});
            }
        }
}
</script>