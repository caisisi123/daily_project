<template>
<card h="12.5rem">
  <template v-slot:content1="{index}">
    <template  v-if="data&&data[index]&&data[index].length">
      <p v-for="(item,i) in data[index]" style="margin-right: 1.5rem">
       {{i+1}}. {{item.description}} <el-checkbox
          :disabled="item.date!==todayFormat" v-model="item.checked" @change="checkChange(item)"></el-checkbox>
      </p>
    </template>
  </template>
  <template v-slot:content2="{index}">
    <template  v-if="data&&data[index+2]&&data[index+2].length">
      <p v-for="(item,i) in data[index+2]" style="margin-right: 1.5rem; ">
       {{i+1}}. {{item.description}} <el-checkbox v-model="item.checked" @change="checkChange(item)"></el-checkbox>
        <!--        <el-checkbox :true-value="'true'" v-model="storage[get_key(fmt,item,i)]" size="default"  :label="item"></el-checkbox>-->
      </p>
    </template>
  </template>
</card>
</template>

<script setup>

import card from '@/components/cards_common.vue'
//import {storage} from '@/page1/store/localStorage'
import {ref,inject,watch,computed,watchEffect} from 'vue';
import {useTodayDataStore} from "@/page1/store/indexedDB";
const todayStore=useTodayDataStore();
//todayStore.$onAction(obj=> console.log(obj))
let today=new Date();
const title=inject('days')
const n=ref(3)
watch(title,()=>{
  //console.log('change', title);
  if(title.value==='最近三天')
    n.value=3
  if(title.value==='最近一周')
    n.value=7
  if(title.value==='最近一个月')
   n.value=30
})
import {todayFormat} from "@/stores/todayForamt";

//console.log(todayFormat);
import {getData,sortedByType,update} from '@/page1/store/indexedDB';
const yes=new Date(today);
yes.setDate(yes.getDate()-1);
const yesterday=`${yes.getFullYear()}-`+`${yes.getMonth()+1}`.padStart(2,'0')+'-'+`${yes.getDate()}`.padStart(2,'0');
/*function getPrevious(n){
    let day=new Date(today);
    day.setDate(day.getDate()-n+1);
    let pre=`${day.getFullYear()}-`+`${day.getMonth()+1}`.padStart(2,'0')+'-'+`${day.getDate()}`.padStart(2,'0');
   // console.log(pre);
    getData(IDBKeyRange.bound(pre,yesterday)).then(res=> {
      data.value = sortedByType(res.concat(todayStore.todayData));
      //console.log(data.value);
    });
}*/
//computed会追踪深层响应吗？如果会，那check改变也会计算

const before=ref([])
watch(n,()=>{
  let day=new Date(today);
  day.setDate(day.getDate()-n.value+1);
  let pre=`${day.getFullYear()}-`+`${day.getMonth()+1}`.padStart(2,'0')+'-'+`${day.getDate()}`.padStart(2,'0');
  // console.log(pre);
  getData(IDBKeyRange.bound(pre,yesterday)).then(res=> {
    before.value= res;
    //console.log(data.value);
  });
},{immediate:true})
const data=computed(()=>{
  const arr=todayStore.todayData.concat(before.value);
  return sortedByType(arr);
})
//watch(n,()=>getPrevious(n.value))

//const update_list=[]
function checkChange(item){
  todayStore.updateStoreCheck(item,item.checked)
  //todayStore.updateStore(i,item)
}



/*let changeStore=false
todayStore.$onAction(()=> changeStore=true)
import {onActivated} from "vue";
onActivated(()=>{
  if(changeStore){
    getPrevious(n.value);
    changeStore=false;
  }
})*/
/*const arr=ref(null)
getData(IDBKeyRange.bound('2023-03-14','2023-3-14')).then(res=> {
  arr.value = sortedByType(res);
  console.log(arr.value);
});*/
</script>
<style scoped>
p{
  margin-left: 1rem;
}
</style>