<template>
<div class="wrapper">
  <el-row justify="space-around" :style="{height:''+h}">
    <el-col v-for="(msg,index) in msg1" :span="12">
      <el-card shadow="never" class="card">
        <h4 class="header">{{msg.header}}</h4>
        <divider :color="msg.color"></divider>
        <div class="output" @click="$emit('dealInputEvent',msg,$event)">
          <slot name="content1" :index="index">
          </slot>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row justify="space-around" :style="{height:''+h}">
    <el-col v-for="(msg,index) in msg2" :span="12">
      <el-card shadow="never" class="card">
        <h4 class="header">{{msg.header}}</h4>
        <divider :color="msg.color"></divider>
        <div class="output"  @click="$emit('dealInputEvent',msg,$event)">
          <slot name="content2" :index=index></slot>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script setup>
import divider from '../components/cardsDivide.vue'

const msg1=[{header:'紧急不重要',color:'yellow'},
  {header:'重要且紧急',color:'pink'},]
const msg2=[{header:'不重要不紧急',color:'skyblue'},
  {header:'重要不紧急',color:'greenyellow'}]
defineProps({
  h:{
    type:String,
    default:'31.6vh'
  }
})
defineEmits(['dealInputEvent'])
</script>

<style scoped>
.header{
  text-align: center;
  font-size: 1.2rem;
  height:3rem;
  line-height: 3rem;
}
div.output{
  overflow: auto;
  padding: 0.5rem;
}
.el-card{
  padding:0;
  border-color: pink;
}
:deep(.el-card__body){
  padding:0rem;

}

.el-col,.el-card{
  width: 100%;
  height: 100%;
}
.output{
  min-height: 26vh;
  height:87%
}
</style>