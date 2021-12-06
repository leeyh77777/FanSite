<template>
<img class="news_img" src="../../assets/news.png" style="max-width:100%; height:auto;">
<div class="n_tit">Press</div>
<label><input class="type_btn" type="checkbox" id="check" name="newsType" value="actor" v-model="checked" @click="checkValue">Actor</label>
<label><input class="type_btn" type="checkbox" id="check" name="newsType" value="singger" v-model="checked" @click="checkValue"> Singer</label>
<label><input class="type_btn" type="checkbox" id="check" name="newsType" value="etc" v-model="checked" @click="checkValue">etc</label>
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
    },
    methods : {
        checkValue() {
           
        }
    }
    
}
</script>