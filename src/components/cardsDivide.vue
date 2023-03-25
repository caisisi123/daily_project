<template>
  <p :style="{borderColor:''+color+''}" class="divider"></p>
</template>

<script setup>
  defineProps({
    color:{
      required:true,
    }
  })
</script>

<style scoped>
.divider{
  border:0.05rem solid grey;
}
</style>