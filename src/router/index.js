import { createRouter, createWebHistory } from 'vue-router'
import firstView from '../page1/page1.vue';
/*let url=null
import ('@/stores/echarts.min.js?url').then(m=>url=m)*/
const secondView=()=>import(/* webpackChunkName: "secondView" */'../page2/View2.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:'/',
      name:'index',
      component:firstView
    },{
    path:'/list',
      name:'list',
      component:secondView
    },{
    path:'/focus',
      name:'focus',
      component:()=>import(/*webpackChunkName:'thirdView'*/'../page3/view3.vue'),
    },{
    path:'/statistic',
      name:'statistic',
    /*  beforeEnter:()=>{
        const script=document.createElement('script')
        script.src=url;
        console.log('url',url);
        document.head.appendChild(script);
      }*/
      component:()=>import(/*webpackChunkName:'fourthView'*/ '../page4/fourthView.vue'),
    }
  ]
})
import {ElLoading} from "element-plus";
let loading=null;
router.beforeEach((to,from)=>{
  loading=ElLoading.service();
  //console.log(loading);
})
router.afterEach((to,from)=>{
  loading.close();
})

export default router;
