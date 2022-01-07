<template>
      <Form />
</template>

<script>
import Form from "../../components/news/Form.vue"
export default {
  components: {
    Form
   },
    created() {
        if (!this.$isLogin()) {
            return this.$router.push({ path : "/login"});
        }
    }
}
</script>