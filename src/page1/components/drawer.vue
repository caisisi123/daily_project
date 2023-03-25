<template>
<div class="wrapper" >
  <img :src="downDrawer" @click="dis" :class="{clicked:is_click}">
</div>
</template>

<script setup>
import{ref} from 'vue'
import downDrawer from '../assets/down2.png'
let is_click=ref(false)
function dis(){
  //console.log(is_click.value);
  return is_click.value===true?false:true
}
</script>

<style scoped>
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
  z-index:-1;
  left:calc(50% - 0.75rem);

}
.drawer{

}
.no-drawer{

}
</style>