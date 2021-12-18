<template>
<img class="news_img" src="../../assets/board.png" style="max-width:100%; height:auto;">
<div class="b_tit">Community</div>
    <div class="board_view">
        <dl>
            <dd class="bg_wh">{{ board.subject }}</dd>
        </dl>
        <div class="right">
        <dl>
            <dd>글쓴이 : {{ board.poster }}</dd>
        </dl>
        <dl>
        <dd>등록일 : {{ board.regDt }}</dd>
        </dl>
        </div>
        <div class="borderline"></div>
        <dl>
            <dt class="stit"></dt>
            <dd>
                <div v-html="board.contentHtml" class="content"></div>
            </dd>
        </dl>
        <div class="btns">
        <button class="btn_news btn_news_margin" type="button" @click="deleteBoard">삭제</button>
        <button class="btn_news" type="button" @click="goLink('edit')">수정</button>
        <button class="btn_news" type="button" @click="goLink('add')">추가</button>
        <button class="btn_news" type="button" @click="goLink('')">목록</button>
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
            board : {},
        };
    },
    async mounted() {
        const idx = this.$route.query.idx;
        const result = await this.$view(idx);
          console.log(result);
        if (result.success) {
            this.board = result.data;
          
        }
        /*
        if (result.message) {
            this.$showMesage(this, result.message);
        }
        */
    },
    methods : {
        goLink(link) {
            this.$router.push({ path : "/board/" + link, query : { idx : this.board.idx }});
        },
        async deleteBoard() {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return;
            }
            const idx = this.board.idx;
            const result = await this.$delete(idx);
            if (result.success) {
                this.$router.push({ path : "/board" });
            }
            if (result.message) {
                this.$showMessage(this, result.message);
            }
        }
    }
}
</script>