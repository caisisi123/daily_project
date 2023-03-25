import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router/index'
//import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import './assets/main.css'
const app = createApp(App)
/*import(/!*webpackChunkName:"echarts"*!/'./stores/echarts.min')*/
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
document.addEventListener('DOMContentLoaded',()=>{
    import('@/stores/echarts.min.js?url').then(m=> {
        //console.log(m.default)
        const script=document.createElement('script')
        script.src=m.default;
        document.head.appendChild(script)
    })
})