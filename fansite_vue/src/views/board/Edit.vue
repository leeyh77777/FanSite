<template>
    <div class="b_tit">게시글 수정</div>
    <Form :mode="mode" ref="frm" />
</template>
<script>
import Form from "../../components/board/Form.vue"
import board from "../../models/board.js"
export default {
    components: { Form},
    mixins: [board],
    data() {
        return {
            mode : "edit",
        };
    },
    created() {
    if (!this.$isLogin()) {
        return this.$router.push({ path : "/login"});
    }
    },
    async mounted() {
        const idx = parseInt(this.$route.query.idx);
        const result = await this.$view(idx);
        if (result.success) {
            this.$refs.frm.updateData(result.data);
        }
    }
}
</script>