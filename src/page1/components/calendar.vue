<template>
  <div class="wrapper" >
  <top_info></top_info>
      <div class="calendar_wrapper" >
    <img class="circle" :src="circle" ref="img">
 <el-calendar v-model="day" :title="''" :range="[firstDayOfWeek,lastDayOfWeek]" class="calendar" ref="cal">
   <template #date-cell="{data}"  >
     <p v-if="data.isSelected" v-get-date="data">
       {{ data.day.slice(8)}}
     </p>
   </template>
 </el-calendar>
      </div>
    <MonthCalendar :syn-date="day"></MonthCalendar>
  </div>
<!--<mpCalendar mode="week" select-mode="select" :selectDate="2023-2-22" :remarks="remarks" :lunar="lunar" class="calendar"></mpCalendar>-->
</template>

<script setup>
import {ref, computed, onMounted, watch} from "vue";
import {useSelectedDayStore} from "@/page1/store/selectedDay";
import MonthCalendar from "@/page1/components/monthCalendar.vue";
const store=useSelectedDayStore();
import circle from '../assets/circle.png'
const cal=ref(null)
let day=ref(new Date());
const img=ref();
const vGetDate={
  created:(el,binding)=>{
     console.log('binding', binding.value);
    store.$patch({
      selectDay:binding.value.date
    });

  }
}
store.$subscribe((mutation,state)=>{
  updateLeft(state.selectDay)
})
// 计算当前日期所在周的第一天
const firstDayOfWeek = computed(() => {
  let date=store.selectDay;
  const dayOfWeek = date.getDay()
  const diff = date.getDate() - dayOfWeek+1
  return new Date(date.setDate(diff))

});
// 计算当前日期所在周的最后一天
const lastDayOfWeek = computed(() => {
  const date = new Date(store.selectDay);
  const day = date.getDay() || 7;
  if (day !== 6) date.setHours(24 * (7 - day));
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()-1);
});
onMounted(()=>{
  updateLeft(new Date())

})
function updateLeft(date){
  let day=date.getDay()
  console.log('can', cal.value.selectedDay);
  img.value.style.left=`${0.9+day*3.35}rem`
}
</script>
<style scoped>
  .el-calendar{
    width: 100%;
    border-color: red;
  }
img{
  width: 1.5rem;
}
.calendar_wrapper{
  position: relative;
}
.circle{
  display: inline-block;
  position: absolute;
  top:2.3rem;
  left:0.9rem
}
</style>