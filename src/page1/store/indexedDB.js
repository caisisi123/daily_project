//存每日专注数据，格式为{date:'',title:'',description:'', checked:false/true}
import {todayFormat} from "@/stores/todayForamt";

const request=indexedDB.open('PlanDB',5)
try{

    request.onupgradeneeded=function (e){
        const db=e.target.result;
        if(db.objectStoreNames.contains('record')){
           db.deleteObjectStore('record')
        }
        const store2= db.createObjectStore('record',{keyPath:'id',autoIncrement:true});
        store2.createIndex('date','date');
        store2.createIndex('all',['date','type','description']);
    }
    /*request.onsuccess=function (e){
        const db=e.target.result;
        const ts=db.transaction('record','readwrite')
        const store=ts.objectStore('record');
        store.clear()
    }*/
}catch (e){
}
class Text{
    constructor(date,type,description,check=false) {
        this.date=date;
        this.type=type;
        this.description=description;
        this.checked=check;
        this.focusTime=0;
        this.focusTimes=0;
    }
}
/*function storeContent(texts){
    if(!texts)
        return;
    const request=indexedDB.open('PlanDB',3);
    let addRequest=null;
    request.onsuccess=function (e){
        const db=e.target.result;
        const ts=db.transaction('record','readwrite');
        const store=ts.objectStore('record');
        if(Array.isArray(texts)){
          addRequest=texts.forEach(text=> {
              store.add(text);

          });
        }else{
           addRequest= store.add(texts)
        }
        ts.oncomplete=function (){
            console.log(texts);
        }
    }
}*/
function update(texts){
    console.log(texts);
    const request=indexedDB.open('PlanDB',5);
    try{
        request.onsuccess=function (e){
            const db=e.target.result;
            const ts=db.transaction('record','readwrite');
            const store=ts.objectStore('record');
            const index=store.index('all')
            texts.forEach(obj=>{
                const text=Object.assign({},obj)
                const getR=index.get([text.date,text.type,text.description]);
                getR.onsuccess=function (e){
                    const record=e.target.result;
                    if(record){
                        Object.assign(record,text)
                        store.put(record)
                    }else{
                        store.add(text);
                    }
                }
            });
            ts.complete=function (){
                db.close()
            }
        }
    }catch(e){

    }
}
function getData(date){
    return new Promise((resolve,reject)=>{
        const request=indexedDB.open('PlanDB',5);
        request.onsuccess=function (e){
            const db=e.target.result;
            const ts=db.transaction('record','readonly');
            const store=ts.objectStore('record');
            console.log(store);
            const index=store.index('date');
            const getR=index.getAll(date);//可以用bound
            getR.onsuccess=function (e){
                console.log(e.target.result);
                resolve(e.target.result);
            }
            ts.oncomplete=function (){
                return getR.error?reject(getR.error):resolve(true);
            }
        }
    })
}
import {ref} from 'vue';


function sortedByType(arr){
    if(!arr.length)
        return [];
    const res=[[],[],[],[]];
    arr.forEach(obj=>{
        if(typeof obj.type !=='number')
            return;
        res[obj.type].push(obj);
    })
  //  console.log(res);
    return res;
}
import {defineStore} from "pinia";

export const useTodayDataStore=defineStore('today_data',()=>{
    const todayData=ref([])

    getData(todayFormat).then(res=>{
        if(res.length){
            console.log('compute todayData',res);
            todayData.value=Object.assign(todayData.value,res);
        }
    })

    //新增数据
    function pushStore(item){
        todayData.value.push(item)
    }
    //更改check
    function updateStoreCheck(item,checked){
        item.checked=checked;
    }
    //更改focusTime,focusTimes
    function updateStoreTime(item,focusTime){
         const index=todayData.value.findIndex(obj=>obj.type===item.value.type&&obj.description===item.value.description)
        todayData.value[index].focusTime+=focusTime;
        console.log(focusTime,todayData);
        todayData.value[index].focusTimes++;
    }

    return {todayData,pushStore,updateStoreCheck,updateStoreTime}
})


export{getData,Text,sortedByType,update}