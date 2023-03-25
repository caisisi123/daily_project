import{todayFormat} from "@/stores/todayForamt";
////import { ref, watch, watchEffect} from 'vue';
import {useTodayDataStore} from "@/page1/store/indexedDB";
import {ref,nextTick,onBeforeMount} from "vue";
const todayStore=useTodayDataStore();
console.log(todayStore.todayData);


let t_counts=ref(0),t_time=ref(0);//今天总次数，总时
console.log('statistic',todayStore.todayData);
if(todayStore.todayData.length){
    todayStore.todayData.forEach(obj=>{
        if(obj.focusTime>0){
            // console.log(obj.focusTime);
            t_time.value+=obj.focusTime;
            t_counts.value+=obj.focusTimes;
        }
    })
    // console.log(t_time.value);
}





let totalCounts=ref(0),totalTime=ref(0),totalDays=ref(0);
    const r=indexedDB.open('PlanDB',5)
    r.onsuccess=function (e){
        const db=e.target.result;
        const ts=db.transaction('record','readonly')
        const store=ts.objectStore('record');
        const request=store.getAll()
        request.onsuccess=function (e){
            const arr=e.target.result;
            if(!arr.length){
                return;
            }
            const set=new Set()
            arr.forEach(obj=>{
                if(obj.focusTime){
                    totalCounts.value+=obj.focusTimes;
                    totalTime.value+=obj.focusTime
                    set.add(obj.date)
                }
            })
            totalDays.value=set.size
            //console.log(totalCounts, totalDays);
        }
    }


todayStore.$onAction(obj=>{
    if(obj.name==="updateStoreTime"){
        nextTick(()=>{
            t_time.value+=obj.args[1];
            t_counts.value+=1;
            totalCounts.value+=1;
            totalTime.value+=obj.args[1];
            if(!localStorage.getItem(todayFormat)){
                totalDays.value+=1;
                localStorage.setItem(todayFormat,
                    `${totalDays.value}`)
            }
        })

    }
    //  console.log(localStorage.getItem(todayFormat));

})
export {totalTime,totalCounts,totalDays,t_time,t_counts}