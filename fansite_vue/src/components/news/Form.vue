<template>
    <form id='frmNews' ref="frmNews" autocomplete="off" @submit="formSubmit($event)">
        <input type="hidden" name="mode" :value="mode">
        <input type="hidden" name="idx" v-model="idx">
        <dl>
            <dt>Types Of News</dt>
        <dd>
        <input type="radio" name="status" id='status_actor' value="actor" v-model="picked">
        <label for='status_actor'>Actor IU</label>

        <input type="radio" name="status" id='status_singer' value="singer" v-model="picked">
        <label for='status_singer'>Singer IU</label>

        <input type="radio" name="status" id='status_etc' value="etc" v-model="picked">
        <label for='status_etc'>etc</label>
        </dd>
        </dl>
        <dl>
            <dt>Subject</dt>
            <dd>
                <input type="text" name="subject" v-model="subject">
            </dd>
        </dl>
        <dl>
            <dt>Content</dt>
            <dd>
                <Editor 
                    api-key="13l7qxj3515d4atocxe80zsvuhtg4yq1yob5b4y54jf7hmi6" 
                    :init="{
                    height: 500,
                    menubar: true,
                    plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }"
                    v-model="content" ref='editor' />
                
                <input type="file" @change='addImage($event);'>
            </dd>  
        </dl>
        <input type="submit" value="뉴스 등록" v-if="mode == 'add'">
        <input type="submit" value="뉴스 수정" v-else>
    </form>
    <MessagePopup ref='popup' :message="message" />
</template>

<script>
import news from "../../models/news.js"
import MessagePopup from "../../components/common/Message.vue"
import Editor from '@tinymce/tinymce-vue'
export default {
    mixins : [news],
    components : {MessagePopup, Editor},
    name: 'app',
    data() {
            return {
            message : "",
            idx : 0,
            picked : "etc",
            subject : "",
            content : "",
        };
    },
    props : {
        mode : {
            type : String,
            default : "add",
        },
    },
    methods : {
        async formSubmit(e) {
            e.preventDefault();
            const formData = new FormData(this.$refs.frmNews);
            formData.append("content", this.content);
            let result = {};
            let idx = 0;
            
            if (this.mode == 'add') { // 뉴스 추가
                result = await this.$addNews(formData);
                idx = result.data.idx;
            } else { // 뉴스 수정
                result = await this.$editNews(formData);
                idx = this.$route.query.idx;
            }
            
            if (result.success) {
                this.$router.push({ path : "/news/view", query : { idx }});
                return;
            }
           if (result.message) {
               this.$showMessage(this, result.message);
           }
            
        },
        async addImage(e) {
          
            const target = e.target;
            const file = target.files[0];
            const data = await this.$sendFile(file);
            if (data.message) {
                this.$showMessage(this, data.message);
            }
            if (data.success) {
                this.content += "<img src='" + this.$store.state.apiURL + data.data.imageUrl + "'>"; 
            }
        
        },
        /** 수정 데이터 반영  */
        updateData(data) {
            this.idx = data.idx;
            this.subject = data.subject;
            this.content = data.content;
            this.picked = data.status;
        }
    }
}
</script>