<template>
<img class="news_img" src="../../assets/news.png" style="max-width:100%; height:auto;">
<div class="n_tit">Press</div>
<div class="hline ment">** 원하는 뉴스를 선택하세요 **</div>
<div class="check">
<input class="type_btn" type="radio" id="check_actor" name="newsType" value="actor" v-model="checked">
<label for="check_actor">Actor</label>
<input class="type_btn" type="radio" id="check_singer" name="newsType" value="singger" v-model="checked">
<label for="check_singer">Singer</label>
<input class="type_btn" type="radio" id="check_etc" name="newsType" value="etc" v-model="checked">
<label for="check_etc">etc</label>
</div>
<div class="nt_tit">
    <div class="actor" v-show="checked.includes('actor')">
        <List status="actor" />
    </div>
    <div class="singger" v-show="checked.includes('singger')">
        <List status="singer" />
    </div>
    <div class="etc" v-show="checked.includes('etc')">
        <List status="etc" />
    </div>
</div>
</template>
<script>
import List from "../../components/news/List.vue"
export default {
    components : {List},
    data() {
        return {
            checked : [],
        }
    },
    created() {
        if (!this.$isLogin() && this.$getToken()) {
            location.reload();
        }
    }
    
}
</script>