<template>
    <img class="login_img" src="../../assets/login.png" style="max-width:100%; height:auto;">
    <div class="p_tit">Login</div>
    <form ref="frmLogin" autocomplete="off" @submit="formSubmit($event)">
        <input type="text" name="memId" placeholder="아이디" v-model="memId"><br>
        <input type="password" name="memPw" placeholder="비밀번호" v-model="memPw"><br>
        <input type="submit" value="로그인" class="s_btn">
        <input type="button" @click="go('join')" class="s_btn" value="회원가입">
    </form>
    
    <MessagePopup ref='popup' :message="message" />
</template>
<script>
import MessagePopup from '../../components/common/Message.vue'
import member from '../../models/member.js'
export default {
    components : {MessagePopup},
    mixins : [member],
    created() {
        if (this.$isLogin()) {
            this.$router.push({ path : "/logout"} );
        }
    },
    data() {
        return {
            message : "",
            memId : "",
            memPw : "",
        };
    },
    methods : {
        async formSubmit(e) {
            e.preventDefault();
            const formData = new FormData(this.$refs.frmLogin);
            const result = await this.$login(formData);
            console.log("result", result);
            if (result.success) {
                this.memId = "";
                this.memPw = "";
                this.$router.push({ path : "/"});
            }
            if (result.message) {
                this.$showMessage(this, result.message);
            }
        },
        // 링크 이동
        go(link) {
            this.$router.push( { path : "/" + link });
        }
    }
}
</script>