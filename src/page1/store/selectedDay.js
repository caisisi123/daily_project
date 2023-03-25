import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/*export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})*/
export  const useSelectedDayStore=defineStore('selectDay',()=>{
    let selectDay=ref(new Date())

    const formatDate=computed(()=>{
        let day=selectDay.value;
        let date=`${day.getFullYear()}-`+`${day.getMonth()+1}`.padStart(2,'0')+'-'+`${day.getDate()}`.padStart(2,'0')//日期
        return date;
    })
    return {selectDay,formatDate}
})