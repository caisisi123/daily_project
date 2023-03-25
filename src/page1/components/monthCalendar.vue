<template>
  <div class="wrapper" >
    <img :src="downDrawer" @click="dis" :class="{clicked:is_click}">
  </div>
  <el-collapse>
    <el-collapse-item title="">

      <el-calendar  ref="calendar"  >
        <template #date-cell="{data}"  >
          <p v-if="data.isSelected" v-get-date="data">
            {{ data.day.slice(8)}}
            {{ data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
    </el-collapse-item>
  </el-collapse>

</template>

<script setup>
import drawer from './drawer.vue'
import downDrawer from '../assets/down2.png'
import Drawer from "@/page1/components/drawer.vue";
import {useSelectedDayStore} from "@/page1/store/selectedDay";
import {reactive, ref} from "vue";
import circle from '../assets/circle.png'
let is_click=ref(false)
let day=ref(new Date())
const store=useSelectedDayStore()
const calendar=ref()
function dis(){
  //console.log(is_click.value);
  return is_click.value===true?false:true
}
const vGetDate={
  created:(el,binding)=>{
   // console.log('binding', binding.value.date);
    store.$patch({
      selectDay:binding.value.date
    });
  }
}
const selectDate = (val => {
  calendar.value.selectDate(val)
})

</script>

<style scoped>
.is-selected {
  color: #1989fa;
}
::v-deep .el-calendar-table>thead{
  display: none;
}
::v-deep .el-collapse{
  position: relative;
}
::v-deep .el-collapse-item__wrap{
  position: absolute;

  z-index: 999;
}
::v-deep .el-collapse-item__header{
  /*折叠时*/
  height: 1.5rem;
  padding: 0;
  opacity: 0;
}
::v-deep .el-icon{
  display: none;
}
::v-deep .el-collapse-item__content{
  padding: 0;
}
::v-deep .el-collapse-item__header.is-active{
  /*展开的类名*/
 opacity: 1;

}
.clicked{
  display: none;
}
.wrapper{

  position: relative;
  border-top:1px solid pink;
}
.wrapper img{

  display: block;
  height: 1.5rem;
  position: absolute;
  bottom:-1.5rem;
  z-index: -1;
  left:calc(50% - 0.75rem);

}
</style>