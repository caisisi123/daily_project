<template>
  <div class="myClock" :style="{backgroundImage:'url('+bgUrl+')'}" ref="myClock">
    <div class="clock" @click="showCard">
      <span class="time">{{ time }}:{{seconds}}</span>
    </div>
    <el-button @click="startTiming" style="font-size: 1.4rem; margin:0.8rem auto;width:7rem; display:block;padding:2px;height:1.8rem">{{timing_title}}</el-button>
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
import {inject, ref, watch} from "vue";
import bgUrl from '../assets/bg.gif';
import {ElNotification} from "element-plus";

const time=ref('25')
const seconds=ref('00')

const className=inject('className')
watch(className,()=>{
  if(className.value==='positive'){
    time.value='00';
  }else {
    time.value='25';
  }
  seconds.value='00'
})

let negative_total=Number(time.value)*60+Number(seconds.value);
let total=0;
function startTiming(){
  if(title.value==='请选择专注计划'){
    ElNotification({
      message:'请先选择专注计划再开始计时',
      duration:1000,
      position:"top-left",
      type:'warning',
      offset:200,
    })
  }
  if(timing_title.value==='停止计时'){
    if((className.value==='negative'&&(negative_total-total)<10)||(className.value==='positive')&&(total<10)){
      ElNotification({
        message:'不记录十秒以下的专注记录',
        duration:1000,
        position:"top-left",
        type:'warning',
        offset:200,
      })
      return;
    }else{
      today_focus.value=className.value==='negative'?negative_total-total:total;
      //console.log('total', negative_total,total,today_focus.value);
      add_today(focus_key.value,today_focus);
      add_today(today_total_key.value,today_focus);
      add_today(total_key,today_focus);
      add_today('total-count',ref(1))
      if(today_focus_counts.value===0){
        add_today('focus_total-days',ref(1));
      }
      today_focus_counts.value++
      //console.log(localStorage.getItem(total_key));
    }
  }

  timing_title.value=timing_title.value==='开始计时'?'停止计时':'开始计时';
  if(timer){
    clearInterval(timer)
    timer=null;
    return;
  }
  if(className.value==='negative'){
    timer=setInterval(()=>{
      total=Number(time.value)*60+Number(seconds.value);
      if(total===0){
        clearInterval(timer);
      }else{
        total=total-1;
      }
      time.value=String(Math.floor(total/60)).padStart(2,'0');
      seconds.value=String(total%60).padStart(2,'0')
    },1000);
  }else{
    total=0;
    timer=setInterval(()=>{
      total+=1;
      time.value=String(Math.floor(total/60)).padStart(2,'0');
      seconds.value=String(total%60).padStart(2,'0')    },1000)
  }
}

function showCard(){
  if(className.value==='positive')
    return;
  clock.value.style.visibility=clock.value.style.visibility==='hidden'?'visible':'hidden'
}
</script>

<style scoped>

</style>