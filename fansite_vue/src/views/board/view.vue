<template>
    <div class="board_view">
        <dl>
            <dt class="stit">Board Title</dt>
            <dd class="bg_wh">{{ board.subject }}</dd>
        </dl>
        <dl>
            <dt class="stit">The board</dt>
            <dd>
                <div v-html="board.contentHtml" class="content"></div>
            </dd>
        </dl>
        <div class="btns">
        <button type="button" @click="goLink('add')">추가</button>
        <button type="button" @click="goLink('edit')">수정</button>
        <button type="button" @click="deleteBoard">삭제</button>
        <button class="btn_news" type="button" @click="goLink('list')">목록</button>
        </div>
    </div>

    <MessagePopup ref="popup" :message="message" />
</template>
<script>
import MessagePopup from "../../components/common/Message.vue"
import board from "../../models/board.js"
export default {
    components : {MessagePopup},
    mixins : [board],
    data() {
        return {
            message : "",
            view : {},
        };
    },
    async mounted() {
        const idx = this.$route.query.idx;
        const result = await this.$get(idx);
        if (result.success) {
            this.view = result.data;
        }
        if (result.message) {
            this.$showMesage(this, result.message);
        }
    },
    methods : {
        goLink(link) {
            this.$router.push({ path : "/board/" + link, query : { idx : this.view.idx }});
        },
        async deleteBoard() {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return;
            }
            const idx = this.view.idx;
            const result = await this.$deleteBoard(idx);
            if (result.success) {
                this.$router.push({ path : "/board/list" });
            }
            if (result.message) {
                this.$showMessage(this, result.message);
            }
        }
    }
}
</script>