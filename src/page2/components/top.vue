<template>
  <div class="wrapper">
    <div class="top" :style="{backgroundImage:'url('+topUrl+')'}">
      <span class="left">清</span><span class="right">单</span>
    </div>
   <div class="drown-down">
     <el-dropdown trigger="click"  @command="dealCommand">
    <span class="el-dropdown-link" >
      <span  style="font-size: 2rem">{{title}}</span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
       <template #dropdown>
         <el-dropdown-menu>
           <el-dropdown-item command="最近三天"  style="font-size: 2rem">最近三天</el-dropdown-item>
           <el-dropdown-item command="最近一周" style="font-size: 2rem">最近一周</el-dropdown-item>
           <el-dropdown-item command="最近一个月" style="font-size: 2rem">最近一个月</el-dropdown-item>
         </el-dropdown-menu>
       </template>
     </el-dropdown>
   </div>
  </div>
  <cards h="34.5vh"></cards>
</template>

<script setup>
import {ref,provide} from 'vue'
import topUrl from '../assets/img_4.webp'
import { ArrowDown } from '@element-plus/icons-vue'
const title=ref('最近三天')
import cards from './cards_stat.vue'
function dealCommand(command){
  title.value=command;
}
provide('days',title)
</script>

<style scoped>
.wrapper{
  border: 0.12rem solid lightpink;
  border-bottom: none;
  margin-bottom: 0.5rem;
}
.top{
  height:20vh;
  box-sizing: border-box;
  background-size: contain;
  text-align: center;
  vertical-align: middle;
  background-position: center 1.2rem;
  background-repeat: repeat-x;
  position: relative;
}
.left{
  position: absolute;
  font-size: 3rem;
  font-weight: bold;
  left:25%;
  top: 12vh;
  border:0.3rem solid lightpink;
  border-radius: 50%;
}
.right{
  position: absolute;
  font-size: 3rem;
  font-weight: bold;
  right:25%;
  top: 12vh;
  border:0.3rem solid lightpink;
  border-radius: 50%;
}
.el-dropdown{
  margin-top:0.2rem;
  float: right;
  border:0.3vh solid lightpink;
}
.drown-down{
  height:4vh;
}
.el-dropdown__popper.el-popper {
  height:15vh;
}

.el-dropdown-link {
  cursor: pointer;
  color: lightpink;
  display: flex;
  padding:0.3vh;
  align-items: center;
}
:deep(.el-dropdown .el-dropdown__caret-button:active){
  color:lightpink;
  border-color: lightpink;
  background: white;
  border-bottom: none;
}
:deep(.el-popper){
  height: 10vh;
}
</style>