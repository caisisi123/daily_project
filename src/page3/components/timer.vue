<template>
  <div class="wrapper" :style="{backgroundImage:'url('+bgUrl+')'}">
  <h3 @click="deal_choose($event)"><span class="negative" :class="{choose:className==='positive'}">番茄钟 </span>/<span class="positive" :class="{choose:className==='negative'}"> 正计时</span></h3>
  <el-button @click="choose">专注：{{title}}</el-button>
  <div class="drawer">
    <el-drawer v-model="drawer" direction="btt">
      <template #header>
        <p>{{day.getMonth()+1}}月{{day.getDate()}}日</p>
      </template>
      <div class="output">
        <template v-if="data1&&data1.length">
            <template v-for="(obj,index) in data1">
              <p style="border-bottom:0.3vh dotted lightpink;font-size: 2rem"  @click="choose_item(obj)">{{obj.description}}</p>
            </template>
        </template>
      </div>
    </el-drawer>
  </div>
  </div>
  <Clock @isStopTimming="deal_isStop"></Clock>
</template>

<script setup>
import {ref, provide,watchEffect,computed} from 'vue';
import bgUrl from '../assets/img.webp';
//import {storage} from '@/page1/store/localStorage';
//import clock from './clock.vue'
import Clock from "@/page3/components/clock.vue";
import {ElNotification} from "element-plus";
const title=ref('请选择专注计划');
provide('title',title)
//const today=new Date();
const drawer=ref(false);
const day=new Date()
day.setDate(day.getDate());
let fmt=`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`
import {sortedByType} from '@/page1/store/indexedDB'
import {useTodayDataStore} from "@/page1/store/indexedDB";
const todayStore=useTodayDataStore()
const data1=computed(()=>todayStore.todayData)
//console.log(today_data.value);
/*if(today_data.value.length){
  data1.value=sortedByType(today_data.value)
}*/
/*console.log(data1.value);*/

//const data1=sortedByType(today_data)
/*import {todayFormat} from "@/stores/todayForamt";
getData(todayFormat).then(res=>{
  data1.value = res;
 // console.log(data1.value);
})*/
/*console.log(today_data);/!**!/
data1.value=today_data;*/
const className=ref('negative');
provide('className',className)
function choose(){
  drawer.value=true;
}

const type=ref('default')
provide('type',type)
const chooseItme=ref(null)
provide('choosedItem',chooseItme)
function choose_item(obj){
  //console.log(obj);
  chooseItme.value=obj
  type.value=obj.type
  drawer.value=false;
  title.value=obj.description;
}

let timing_title=null;
function deal_isStop(title) {
  timing_title=title;
}
function deal_choose(event){

  if(timing_title.value==='停止计时'){
    ElNotification({
      message:'请先停止计时再切换',
      duration:2000,
      position:"top-left",
      type:'warning',
      offset:200,
    });
    return;
  }
  className.value=event.target.classList[0];
}
</script>

<style scoped>
.wrapper{
  height: 40vh;
  background-position:15vw 4vh;
  background-size: 80vw 28vh;
  background-repeat: no-repeat;
  text-align: center;
}
h3{
    position: absolute;
    top:35vh;
    left:38vw;
  font-size:2rem ;
  }
.el-button{
  position:absolute;
  top:29vh;
  left:30vw;
  font-size: 2rem;
  height:4vh;

}
.output{
  padding: 0 3rem;
}
.choose{
  color:lavenderblush;
}
</style>