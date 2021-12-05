<template>
    <img class="login_img" src="../../assets/login.png" style="max-width:100%; height:auto;">
    <div class="p_tit">Join</div>
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