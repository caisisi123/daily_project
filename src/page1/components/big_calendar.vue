<template>
  <el-calendar style="height: 7.5vh" :range="[firstDayOfWeek,lastDayOfWeek]" v-model="day"></el-calendar>
  <div class="wrapper">
    <img :src="downDrawer" >
  <el-collapse>
    <el-collapse-item :title="''">
      <el-calendar v-model="day" ref="calendar" >
        <template #header="{date}">
          <el-row justify="space-between" style="border-top:1px solid plum">
            <div class="leftArrow_wrapper" @click="goto('prev-month')"><img class="leftArrow" :src="leftArrow" alt="" loading="lazy"></div>
            <p>{{date}}</p>
            <p class="text" @click="goto('today')">to Today</p>
            <div class="rightArrow_wrapper" @click="goto('next-month')"><img class="rightArrow" :src="rightArrow" alt="" loading="lazy"></div>
          </el-row>
        </template>
        <template #date-cell="{data}">
          <p v-if="data.isSelected" v-get-date="data">
            {{ data.day.slice(8)}}{{ data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
    </el-collapse-item>
  </el-collapse>
  </div>
</template>

<script setup>
// 计算当前日期所在周的第一天
import {computed,ref} from "vue";
import {useSelectedDayStore} from "@/page1/store/selectedDay";
import downDrawer from '../assets/down2.webp'
import leftArrow from '../assets/leftArrow.webp'
import rightArrow from '../assets/rightArrow.webp'
const store=useSelectedDayStore()
const day=ref(new Date())
const vGetDate={
  created:(el,binding)=>{
     //console.log('binding', binding.value.date);//Thu Mar 09 2023 14:17:07 GMT+0800 (中国标准时间)
    store.$patch({
      selectDay:binding.value.date
    });
    //console.log('change_date',store.formatDate);
  }
}
const calendar=ref()
function goto(val){
  calendar.value.selectDate(val)
}
const firstDayOfWeek = computed(() => {
  let date=new Date(day.value)
  const dayOfWeek = date.getDay()
  const diff = date.getDate() - dayOfWeek+1
  return new Date(date.setDate(diff))
});
// 计算当前日期所在周的最后一天
const lastDayOfWeek = computed(() => {
  const date = new Date(day.value);
  const day_of_wk=date.getDay();
  const diff=date.getDate()+(6-day_of_wk)
  return new Date(date.setDate(diff))
});
</script>

<style scoped>
.wrapper{
  height: 3vh;
}
 :deep( .el-calendar:nth-of-type(1) .el-calendar-table>thead){
  display: none;
}
 :deep(.el-calendar:nth-of-type(1) .el-calendar__header){
   padding: 0;
   height: 3.3vh;
 }
::v-deep.el-calendar:nth-of-type(2) .el-calendar__header{
   display: none;
}
:deep(.el-calendar__body){

  padding: 0;
}
:deep( .el-calendar-table thead th ){
  padding: 0.3vh 0;
  color: var(--el-text-color-regular);
  font-weight: 400;
  font-size: 1.3rem;
  height:3vh;
}
:deep( .el-calendar-table .el-calendar-day ){
  box-sizing: border-box;
  text-align: center;
  height: 3.6vh;
  line-height: 1.5vh;
  /* height: var(--el-calendar-cell-width);
   */
}
 :deep( .el-collapse-item__header){
   /*折叠时*/
   height: 3vh;
   padding: 0;
   opacity: 0;
 }
 p{
   height: 100%;
 }
 :deep( .el-collapse-item .is-active){
   /*面板展开*/
   opacity: 1;
 }
 .calendar_wrapper{
   position: relative;
 }

 .leftArrow_wrapper{
   padding-top: 0.2vh;
  position: relative;
   z-index: 9999;
 }
.leftArrow{
  width: 2vh;
}
.rightArrow_wrapper{
  width: 2vh;
  padding-top: 0.3vh;
  padding-right: 0.1vh;
}
.rightArrow{
  position:relative;
  z-index: 999;
  width: 2vh;
}
 .wrapper{
   position: relative;
   border-top:1px solid pink;
  margin-top: -1px;
 }
 .wrapper>img{
   display: block;
   height: 2.2vh;
   position: absolute;
   top:0;
   z-index:-1;
   left:calc(50% - 0.75rem);

 }
 .el-row{
   width: 100%;
 }
 :deep( .el-icon){
   display: none;
 }
 :deep( .el-collapse){
   position: relative;
 }
 :deep(.el-collapse-item__wrap){
   position: absolute;
  margin-top: -0.3vh;
   z-index: 999;
 }
</style>