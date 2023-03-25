<template>
  <div class="myClock" :style="{backgroundImage:'url('+bgUrl+')'}" ref="myClock">
<div class="clock" @click="showCard">
  <span class="time">{{ time }}:{{seconds}}</span>
</div>
    <el-button @click="startTiming" style="font-size: 2rem; margin:3vh auto;width:20vw; display:block;padding:0.6vh;height:3vh">{{timing_title}}</el-button>
  <div class="wrapper" ref="clock">
  <p>专注时长</p>
    <p class="middle"> <caret-right style="width:1.5rem"></caret-right></p>
  <el-scrollbar max-height="8rem" @scroll="scroll" ref="bar">
    <p></p>
    <p v-for="i in 24">{{(i)*5}} </p>
    <p></p>
    <p></p>
  </el-scrollbar>
    <p @click="storeFocus($event)"><el-button class="store">保存</el-button>       <el-button>取消</el-button></p>
  </div>
  </div>
</template>

<script setup>
import {ref, inject, watch, computed,onUnmounted} from 'vue';
const time=ref('25')
const seconds=ref('00')
import {CaretRight} from '@element-plus/icons-vue'
const bgUrl=ref('')
import('../assets/bg.gif').then(res=> {
  bgUrl.value = res.default;
})
import { ElNotification } from 'element-plus';
//import {update,Plan} from '@/stores/indexedDB'
//import {storage} from "@/page1/store/localStorage";
import {useTodayDataStore} from "@/page1/store/indexedDB";
const todayStore=useTodayDataStore()

const bar=ref()
const myClock=ref()
let timerId;
let today=new Date();
//const todayFmt=`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}-total-Focus`;
let focus_time=ref(25);//倒计时选择的时间，显示的时间是time，要确认才会变为time
let clock=ref()
let timing_title=ref('开始计时');

const choosedItem=inject('choosedItem')
function scroll({scrollTop}){
  clearTimeout(timerId);
  timerId=setTimeout(()=>{
    bar.value.setScrollTop(Math.round(scrollTop/32)*32);
    focus_time.value=Math.round(scrollTop / 32)*5+5;
  },500);

}
function showCard(){
  if(className.value==='positive')
    return;
  clock.value.style.visibility=clock.value.style.visibility==='hidden'?'visible':'hidden'
}
function storeFocus(event){
  clock.value.style.visibility='hidden'
  if(event.target.textContent==='保存'){
    time.value=String(focus_time.value).padStart(2,'0');
  }
}
const emit=defineEmits(['isStopTimming'])
const className=inject('className')
emit('isStopTimming',timing_title);
watch(className,()=>{
  if(className.value==='positive'){
    time.value='00';
  }else {
    time.value='25';
  }
  seconds.value='00'
})

import {todayFormat} from "@/stores/todayForamt";

let timer=null,total=0;//total什么时候都是是正向计时的秒数
const focus_recode=[]
const title=inject('title');
watch(title,()=>{
  if(className.value==='negative')
      time.value='25';
  else
    time.value='00'
  seconds.value='00'
})
const type=inject('type')
/*watch(type,()=>{
  console.log('type',type.value,title.value);
})*/

import{Text,update} from '@/page1/store/indexedDB'
function startTiming(){
  let negative_total=Number(time.value)*60+Number(seconds.value);
  if(title.value==='请选择专注计划'&&timing_title.value==='开始计时'){
    ElNotification({
      message:'请先选择专注计划再开始计时',
      duration:1000,
      position:"top-left",
      type:'warning',
      offset:200,
    })
    return;
  }
  if(timing_title.value==='停止计时'){
    if(total<10){
      ElNotification({
        message:'不记录十秒以下的专注记录',
        duration:1000,
        position:"top-left",
        type:'warning',
        offset:200,
      })
      return;
    }
    //超过十秒的
    let this_focus=total;
    if(this_focus>=3600){
      this_focus=`${Math.floor(total/3600)}时${Math.floor(Math.floor(total%3600)/60)}分${Math.floor(total%60)}秒`
    }else if(this_focus>=60){
      this_focus=`${Math.floor(total/60)}分${total%60}秒`
    }
    ElNotification({
      message:'成功专注'+this_focus+'秒',
      duration:2000,
      position:"top-left",
      type:'success',
      offset:200,
    })
  //  const date=new Date()
   // let today2=`${date.getFullYear()}`+'-'+`${date.getMonth()+1}`.padStart(2,'0')+'-'+ `${date.getDate()}`.padStart(2,'0')
 // const index=todayStore.todayData.findIndex()
 /* choosedItem.value.focusTime+=total;
    console.log(choosedItem);
    update([Object.assign({},choosedItem.value)])*/
    todayStore.updateStoreTime(choosedItem,total);
    //focus_recode.push(plan)
    total=0;
    //console.log(focus_recode);
  }
  timing_title.value=timing_title.value==='开始计时'?'停止计时':'开始计时';
  if(timer){
    clearInterval(timer);
    timer=null;
    return;
  }
  if(className.value==='negative'){
    timer=setInterval(()=>{
      if(total===negative_total){
        time.value=0;
        seconds.value=0;
        ElNotification({
          message:'成功专注'+this_focus+'秒',
          duration:0,
          position:"top-left",
          type:'success',
          offset:200,
        })
        clearInterval(timer);
      }
      total+=1
      time.value=String(Math.floor((negative_total-total)/60)).padStart(2,'0');
      seconds.value=String((negative_total-total)%60).padStart(2,'0')
    },1000);
  }else{
      total=0;
       timer=setInterval(()=>{total+=1;
      time.value=String(Math.floor(total/60)).padStart(2,'0');
      seconds.value=String(total%60).padStart(2,'0');
      },1000)
  }
}

/*import {onDeactivated} from "vue";
onDeactivated(()=>{
  if(focus_recode.length){
    update([...focus_recode]);
    focus_recode.length=0;
  }
  //focus_recode.forEach(obj=>update(obj,obj.focusTime))
});*/
</script>

<style scoped>
.clock{
  width: 30vw;
  height: 30vw;
  border:0.1vh solid grey;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  box-shadow: 2px 2px 4px lightpink, -2px -2px 4px lightpink;
}
.time{
  font-size: 2rem;
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
p{
  font-size: 2rem;
  height:3vh;
}
.wrapper{
  text-align: center;
  border:1px solid lightpink;
  width: 60vw;
  box-sizing: border-box;
  padding:1vh 0 0.5vh 0;
  border-radius: 2vh;
  position:relative;
  top:-8vh;
  left:20%;
  margin-top:1vh;
  visibility: hidden;
  opacity: 1;
  font-size: 2rem;
}
.middle{
  width: 100%;
  position: absolute;
  left:0;
  top:50%;
  background:aliceblue;
  text-align: left;
  vertical-align: bottom;
  transform: translateY(-90%);
}
svg{
  transform: translateY(10%);
}
.el-button{
  font-size: 2rem;
}
.myClock{
  height: 51vh;
  margin-top:3vh;
  background-size: 150vw 50vh;
  background-repeat: repeat-x;
  background-position-y: 7vh;
}
.myNotification{

}
</style>