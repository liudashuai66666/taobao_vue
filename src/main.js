import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import '@/styles/common.scss';
import { createApp } from 'vue'
import router from "@/router";
import App from './App.vue'

let app=createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app')
