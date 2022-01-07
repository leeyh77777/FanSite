<template>
    <form id="frmBoard" ref="frmBoard" autocomplete="off" @submit="formSubmit($event)">
        <input type="hidden" name="mode" :value="mode" />
        <input type="hidden" name="idx" v-model="idx">
        <dl>
            <dt>글쓴이</dt>
            <dd>
        <input type="text" name="poster" v-model="poster">
            </dd>
        </dl>
        <dl>
            <dt>게시글 명</dt>
            <dd>
                <input type="text" name="subject" v-model="subject">
            </dd>
        </dl>
        <dl>
            <dt>게시글 내용</dt>
            <dd>
                <Editor 
                    api-key="oo8tvgy193ucyhukegbngu2q2y9alhthykr360p1fwprje4r" 
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
        <input type="submit" value="게시글 등록" v-if="mode == 'add'">
        <input type="submit" value="게시글 수정" v-else>
    </form>
    <MessagePopup ref='popup' :message="message" />
</template>
<script>
import board from "../../models/board.js"
import MessagePopup from "../../components/common/Message.vue"
import Editor from '@tinymce/tinymce-vue'
export default {
    mixins : [board],
    components : {MessagePopup, Editor},
    data() {
        return {
            message : "",
            idx : 0,
            poster : "",
            subject : "",
            content : "",
        };
    },
    props : {
        mode : {
            type : String,
            default : "add",
        }
    },
    methods : {
        async formSubmit(e) {
            e.preventDefault();
            const formData = new FormData(this.$refs.frmBoard);
            formData.append("content", this.content);
            let result = {};
            let idx = 0;
            if (this.mode == 'add') { // 게시글 추가
                result = await this.$add(formData);
                
                idx = result.data.idx;
            } else { // 게시글 수정
                result = await this.$edit(formData);
                idx = this.idx;
            }

            if (result.success) {
                this.$router.push({ path : "/board/view", query : { idx }});
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
            this.poster = data.poster;
            this.subject = data.subject;
            this.content = data.content;
        }
    }
}
</script>