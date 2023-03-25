<template>
<!--  <indexView></indexView>-->
<!--  <secondView></secondView>-->
<!--  <thirdView></thirdView>-->
<!--  <fourth-view></fourth-view>-->
<div class="father">
  <div style="width: 100%;">
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  </div>
  <el-tabs  v-model="selectedItem"  :stretch="true" tab-position="bottom" @tab-click="tabClick">
    <el-tab-pane name="plan">
      <template #label>
        <span style="font-size: 2rem" >做计划 <el-icon ><EditPen /></el-icon></span>
      </template>
      </el-tab-pane>
    <el-tab-pane ><template #label>
      <span style="font-size: 2rem">清单 <el-icon><Document /></el-icon></span>
    </template></el-tab-pane>
<!--    <el-tab-pane style="flex-grow:0">
      <template #label>
        <el-icon  ><CirclePlusFilled /></el-icon>
      </template>
    </el-tab-pane>-->

    <el-tab-pane >
      <template #label>
        <span style="font-size: 2rem">专注 <el-icon><AlarmClock /></el-icon></span>
      </template>
    </el-tab-pane>
    <el-tab-pane >
      <template #label>
        <span style="font-size: 2rem">统计<el-icon><PieChart /></el-icon></span>
      </template>
      </el-tab-pane>
  </el-tabs>
</div>
</template>

<script  setup>
import {computed, ref, getCurrentInstance, onMounted, onUnmounted, onActivated} from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import indexView from './page1/page1.vue'
import {EditPen,Document,PieChart,AlarmClock,CirclePlusFilled  } from "@element-plus/icons-vue";
import {useRoute,useRouter,} from "vue-router";

//onMounted(()=> console.log(window.devicePixelRatio))

const route=useRoute()
const router=useRouter()
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
const selectedItem=ref('plan');
/*let day=new Date()
const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}*/



function tabClick(context,envent){
  //console.log(typeof context.index);
  if(context.index==='0')
    router.push('/')
  if(context.index==='1')
    router.push('/list')
  if(context.index==='2')
    router.push('/focus')
  if(context.index==='3')
    router.push('/statistic')
}

</script>
<style scoped>
.el-tabs{
  position:fixed;
  bottom: 0vh;
  width: 100%;
  height:6vh;
  vertical-align: middle;
  padding-bottom: 0.95vh;

}
:deep(.el-tabs__item){
  font-size: 1.2rem;
  padding:0.1rem;
  //padding-bottom: 1rem;
}
/*:deep(.el-tabs__item:nth-of-type(4)){
  flex-grow: 0;
  line-height: 52px;
}*/
:deep(.el-tabs__nav-wrap::after){
  background-color: white;
}
.father{
  height:100vh;
  flex-direction: column;

}
:deep(.el-tabs--bottom){
  border:none;

}

:deep(.el-tabs--bottom .el-tabs__header){
  height: 100%;
}
:deep(.el-tabs--bottom .el-tabs__header>.el-tabs__nav-wrap){
  height: 100%;
}
:deep(.el-tabs__nav-scroll){
  height: 100%;
}
:deep(.el-tabs__nav.is-stretch){
  height: 100%;
  padding-top: 1vh;
}
:deep(.el-tabs--bottom.is-bottom){
  height: 100%;

}
:deep(.el-tabs--bottom .el-tabs__header.is-bottom){
  margin: 0;
}
</style>