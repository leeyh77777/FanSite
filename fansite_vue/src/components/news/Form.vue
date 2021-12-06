<template>
    <form id='frmNews' ref="frmNews" autocomplete="off" @submit="formSubmit($event)">
        <input type="hidden" name="mode" :value="mode">
        <input type="hidden" name="idx" :value="news.idx" v-if="mode != 'add'">
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
                <input type="text" name="subject" :value="news.subject">
            </dd>
        </dl>
        <dl>
            <dt>Content</dt>
            <dd>
             <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
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
export default {
    mixins : [news],
    components : {MessagePopup},
    name: 'app',
    data() {
            return {
            message : "",
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            }
        };
    },
    computed : {
        picked() {
            return this.news.status || "etc";
        }
    },
    mounted() {
        
    },
    props : {
        mode : {
            type : String,
            default : "add",
        },
        news : {
            type : Object,
            default() {
                return {
                    idx : 0,
                    status : "etc",
                    subject : "",
                    content : "",
                };
            }
        }
    },
    methods : {
        async formSubmit(e) {
            e.preventDefault();
            const formData = new FormData(this.$refs.frmNews);
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
            
        }
    }
}
</script>