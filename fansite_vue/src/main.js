import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import init from './init.js'
import CKEditor from 'ckeditor4-vue';

const app = createApp(App)
init(app)
app.use(router, CKEditor).mount('#app')