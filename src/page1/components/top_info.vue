<template>
  <div  class="wrapper" :style="{backgroundImage:'url('+bgUrl+')'}" >
  <el-row style="height: 10vh"></el-row>
  <el-row  class="top_container" align="middle">
  <el-col align="bottom" :span="3" ><el-avatar  :src="imgUrl" ></el-avatar></el-col>
  <el-col class="content" :span="1.5" :offset="1"></el-col>
  <el-col :span="17"></el-col>
  <el-col  align="middle" :span="1"><el-avatar :src="notUrl" shape="circle" size="default"></el-avatar></el-col>
</el-row>
    <div  style="font-size:1.8rem;text-align: left;position: absolute;color: pink;bottom: 0;text-decoration: yellow wavy underline"><p>今天是{{year}}年{{month}}月{{day}}日~</p></div>
  </div>
</template>

<script setup>
import {computed,ref} from "vue";
const imgUrl=ref('')
import( "../assets/avar.webp").then(m=>imgUrl.value=m.default)
const notUrl=ref('')
import('../assets/message.webp').then(res=>notUrl.value=res.default);
import bgUrl from "@/assets/bg.webp"

//console.log(typeof bgUrl);
let today=new Date()
let year=computed(()=>today.getFullYear().toString())
let month=computed(()=>(today.getMonth()+1).toString().padStart(2,'0'))
let day=computed(()=>(today.getDate()).toString().padStart(2,'0'))
//console.log(typeof today.getFullYear()) number
</script>

<style scoped>
.wrapper{
  text-align: center;
  background-size: contain;
  height: 20vh;
  position: relative;
}
.top_container {

  padding: 0.3rem;
  padding-bottom: 0;
}

</style>