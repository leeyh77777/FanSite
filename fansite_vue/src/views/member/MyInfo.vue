<template>
    <img class="login_img" src="../../assets/myinfo.png" style="max-width:100%; height:auto;">
    <div class="mtit">Edit account info</div>
    <Form :mode="mode" :member="member" />
</template>
<script>
import Form from "../../components/member/Form.vue"
export default {
    components: {Form},
    created() {
        if (!this.$isLogin()) {
            this.$router.push({ path : "/login" })
        }
    },
    computed: {
        member() {
            return this.$getMember();
        }
    },
    data() {
        return {
            mode : "update"
        };
    }
}
</script>