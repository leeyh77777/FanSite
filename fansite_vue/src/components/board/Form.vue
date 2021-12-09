<template>
    <form id="frmBoard" ref="frmBoard" autocomplete="off" @submit="formSubmit($event)">
        <input type="hidden" name="idx" :value="board.idx" v-if="mode != 'add'">
        <dl>
            <dt>게시글 명</dt>
            <dd>
                <input type="text" name="subject" :value="board.subject">
            </dd>
        </dl>
        <dl>
            <dt>게시글 내용</dt>
            <dd>
                <textarea name="content" :value="board.content"></textarea>
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
export default {
    mixins : [board],
    components : {MessagePopup},
    data() {
        return {
            message : "",
        };
    },
    props : {
        mode : {
            type : Object,
            default : "add",
        },
        board : {
            type : Object,
            default() {
                return {
                    idx : 0,
                    subject : "",
                    content : "",
                };
            }
        }
    },
    methods : {
        async formSubmit(e) {
            e.preventDefault();
            const formData = new FormData(this.$refs.frmBoard);
            let result = {};
            let idx = 0;
            if (this.mode == 'add') { // 게시글 추가
                result = await this.$add(formData);
                idx = result.data.idx;
            } else { // 게시글 수정
                result = await this.$edit(formData);
                idx = result.data.idx;
            }

            if (result.success) {
                this.$router.push({ path : "/board/view", query : { idx }});
                return;
            }

            if (result.message) {
                this.$showMessage(this, result.message);
            }
        }
    }
}
</script>