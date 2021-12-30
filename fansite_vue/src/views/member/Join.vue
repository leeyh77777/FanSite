<template>
    <img class="login_img" src="../../assets/login.png" style="max-width:100%; height:auto;">
    <div class="p_tit">Join</div>
    <div class="info">아이디 6자리이상</div>
    <div class="info">비밀번호 8자리이상 알파벳&숫자로 입력하세요</div>
    <Form :mode="mode" />
    
</template>
<script>
import Form from "../../components/member/Form.vue"
export default {
    components: {Form},
    created() {
        if (this.$isLogin()) {
            this.$router.push({ path : "/login" })
        }
    },
    data() {
        return {
            mode : "join"
        };
    }
}
</script>