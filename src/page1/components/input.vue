<template>
<el-drawer direction="btt" v-model="show" >

</el-drawer>
</template>

<script setup>
import {ref} from 'vue'
defineProps({
  header:{
    required:true,
    type:String,
  }
})
const show=ref(false)
</script>

<style scoped>

</style>