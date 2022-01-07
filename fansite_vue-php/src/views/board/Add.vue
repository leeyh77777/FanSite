<template>
    <div class="b_tit">게시글 등록</div>
    <Form />
</template>
<script>
import Form from "../../components/board/Form.vue"
export default {
    components: { Form },
    created() {
        if (!this.$isLogin()) {
            return this.$router.push({ path : "/login" });
        }
    }
}
</script>