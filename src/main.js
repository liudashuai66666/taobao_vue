import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import '@/styles/common.scss';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import router from "@/router/index";
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const pinia = createPinia()
pinia.use(piniaPersist)

app.use(router);
app.use(pinia)
app.use(ElementPlus);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
