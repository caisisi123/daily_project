<template>
  <div class="wrapper">
    <cards  @dealInputEvent="dealInput">
      <template v-slot:content1="{index}">
        <template  v-if="today&&today[index]&&today[index].length">
          <p v-for="(item) in today[index]">
            <el-checkbox :true-value="'true'" v-model="item.checked" size="default" :label="item.description" @change="checkChange(item)"></el-checkbox>
          </p>
        </template>
      </template>
      <template v-slot:content2="{index}">
        <template v-if="today&&today[index+2]&&today[index+2].length">
          <p v-for="(item,i) in today[index+2]">
            <el-checkbox v-model="item.checked" size="default" :label="item.description" @change="checkChange(item)"></el-checkbox>
          </p>
        </template>
      </template>
    </cards>
    <el-drawer v-model="drawer" direction="btt">
      <template #header>
        <p :style="{backgroundColor:color,textAlign:'center',borderRadius:'2rem',fontSize:'2rem'}">{{ title }}</p>
      </template>
      <el-input ref="input"  v-model="text"  :autosize="{ minRows: 4 }" autofocus="true" placeholder="我准备做..." :style="{fontSize:'1.1rem'}" >
        <template #append>
            <div class="confirm_wrapper" @click="storeText">
              <img loading="lazy" :src="confirm" alt="">
            </div>
        </template>
      </el-input>
    </el-drawer>
  </div>
</template>

<script setup>

import {useSelectedDayStore} from "@/page1/store/selectedDay";
const store=useSelectedDayStore();
import {computed, reactive, ref, watch, watchEffect} from 'vue';
//import {findIndex,storage} from '../store/localStorage'
import {Text, sortedByType, update} from "@/page1/store/indexedDB";
import cards from '@/components/cards_common.vue'
//import{store_check,get_check,get_key} from "@/page1/store/storeCheck";
import confirm from '../assets/confirm.webp'
const drawer=ref(false)
//let title='';
let type=0;
let color='';
let text=ref('')
//const record_list=[]
import {useTodayDataStore} from "@/page1/store/indexedDB";
const todayStore=useTodayDataStore()
//console.log(todayStore.todayData);
const today=computed(()=>sortedByType(todayStore.todayData))

/*todayStore.$onAction(obj=>{
  if(obj.name==='updateStoreCheck'){
    obj.after(()=>{today.value=sortedByType(todayStore.todayData);})
  }
})*/
//watch(todayStore.todayData,()=>today.value=sortedByType(todayStore.todayData))
//今天的数据
/*watchEffect(()=>{
  today.value=storage.value[store.formatDate];
})*/
//console.log('today',store.formatDate);
const titles=['紧急不重要','重要且紧急','不重要不紧急','重要不紧急']
const title=ref(titles[type]);
/*function checkBoxChange(event,i,item){
  store_check(store.formatDate,item,i,event)
}*/
const update_list=[];
window.onbeforeunload=function (e){
  console.log('onbeforeunload');
  update(todayStore.todayData)
 // e.preventDefault();
}
const checkedChangeList=[]
function checkChange(item){
  //console.log( val);
 // record_list.push(item)
 // console.log(todayStore.todayData.indexOf(item))

/*  const index=todayStore.todayData.findIndex(obj=>{
    return obj.id===item.id;
  })
  todayStore.updateStore(index,item);
  update_list.push(Object.assign({},item))*/
  todayStore.updateStoreCheck(item,item.checked);
}

//console.log(todayStore.todayData);
const inputList=[];
function dealInput(item,event){
  if(event.target.classList[0]==='output'){
    drawer.value=true;
  }
  //title=item.header;
  type=titles.indexOf(item.header);
  //console.log(type);
  title.value=titles[type]
  //console.log(title, text);
  color=item.color;
}


function storeText(){
  drawer.value=false;
  const record=new Text(store.formatDate,type,text.value)
  //update_list.push(record);
  if(!today.value[type])
    today.value[type]=[];
  today.value[type].push(record)
  todayStore.pushStore(record)
   //console.log(text);
  //console.log(store.formatDate);f
  text.value='';
}
//store.formatDate是选中的日期，title,text分别是
/*import {onDeactivated} from "vue";
onDeactivated(()=> {
  /!*if(record_list.length){
    storeContent([...record_list])
    record_list.length=0;
  }*!/
  if(update_list.length){
    //console.log();
    //console.log(update_list[0]);
    update([...update_list]);
    update_list.length=0;
  }
});*/
//let storeChange1=false;
//todayStore.$onAction(obj=>storeChange1=true)

/*let array=null;
getData(store.formatDate).then(res=> {
  array = res;
  today.value=sortedByType(array)
 // console.log(today.value);
  // console.log(sortedByType(array));[Array(1), Array(0), Array(0), Array(0)]
})*/


</script>

<style scoped>
.el-card{
  padding:0;
  border-color: pink;
}
.el-checkbox{
  position: relative;
  z-index: 99;
}
.header{
  text-align: center;
}
 :deep(.el-card__body){
   padding:0rem;
 }
 :deep(.el-drawer__header){
   margin:0
 }

.confirm_wrapper img{
  width: 6vw;
  vertical-align: middle;
}
:deep( .el-input-group__append ){
  padding:0
}
.clear_button{

}
</style>