<template>
<img class="news_img" src="../../assets/news.png" style="max-width:100%; height:auto;">
<div class="n_tit">Press</div>
<label><input type="checkbox" id="check" name="newsType" value="actor">Actor</label>
<label><input type="checkbox" id="check" name="newsType" value="singger">Singer</label>
<label><input type="checkbox" id="check" name="newsType" value="etc">etc</label>
<div class="nt_tit">
    <div class="actor">
<List status="actor" />
    </div>
    <div class="singger">
<List status="singer" />
    </div>
    <div class="etc">
<List status="etc" />
    </div>
</div>
</template>
<script>
    window.onload = function() {
        // const check = document.getElementById("check");
        
    }

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