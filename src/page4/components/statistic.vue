<template>
<div class="wrapper" :style="{borderImageSource:'url('+imgUrl+')'}">
  <el-row class="total" >
    <el-col :span="8">
        <el-statistic :value="totalCounts">
          <template #title>
            <div style="display: inline-flex; align-items: center;font-size: 2rem">
              专注总次数
              <el-tooltip
                  effect="dark"
                  content="我专注了的次数"
                  placement="top"
              >
                <el-icon style="margin-left: 1vw" :size="'3.5vw'">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
          <template #suffix>次</template>
        </el-statistic>
    </el-col>
    <el-col :span="8">
      <el-statistic :value="totalTime" :formatter="format">
        <template #title>
          <div style="display: inline-flex; align-items: center;font-size: 2rem">
            专注总时长
            <el-tooltip
                effect="dark"
                content="我所有专注记录的总时长"
                placement="top"
            >
              <el-icon style="margin-left: 1vw" :size="'3.5vw'">
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="8">
      <el-statistic :value="totalDays">
        <template #title>
          <div  style="display: inline-flex; align-items: center;font-size: 2rem">
            总专注天数
          </div>
        </template>
        <template #suffix>天</template>
      </el-statistic>
    </el-col>
  </el-row>
<div class="today_statistic">
  <p >今日数据</p>
  <el-divider border-style="dashed"></el-divider>
  <el-row>
    <el-col :span="12">
      <el-statistic :value="t_time" :formatter="format">
        <template #title>
          <div style="display: inline-flex; align-items: center;font-size: 2rem;padding-bottom: 1vh">
            今日专注时长
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="12">
      <el-statistic :value="t_counts">
        <template #title>
          <div  style="display: inline-flex; align-items: center;font-size: 2rem;padding-bottom: 1vh">
            专注次数
          </div>
        </template>
        <template #suffix>次</template>
      </el-statistic>
    </el-col>
  </el-row>
</div>
<div class="barGraph">
  <div class="divider"></div>
  <p>今日计划情况</p>
  <el-divider border-style="dashed"></el-divider>
  <keep-alive><div class="pie" ref="pie" style="width: 100%;height: 56vh;"></div></keep-alive>
</div>

</div>
</template>

<script setup>
import {ref, computed, watch, onMounted, onUnmounted, reactive} from 'vue';
import imgUrl from '../assets/img_6.webp'
import {drawPie,myChart} from "@/page4/store/pieCharts";
const pie=ref()
onMounted(()=>{
  drawPie(pie.value)
})
onUnmounted(()=>{myChart.dispose()})
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue';
import/* webpackPrefetch:true*/ {totalTime,totalCounts,totalDays,t_counts,t_time,} from '../store/statistic'

function format(total_time){
  //console.log(total_time);
  let timeFormat=`${total_time}`.padStart(2,'0')+'秒';
  let total=total_time
  if(total>=3600){
    timeFormat=`${Math.floor(total/3600)}时${Math.floor(Math.floor(total%3600)/60)}分${Math.floor(total%60)}秒`
  }else if(total>=60){
    timeFormat=`${Math.floor(total/60)}分${total%60}秒`
  }
  return timeFormat
}



/*const app=getCurrentInstance().appContext.app
console.log(app);*/
//console.log(isRef(todayStore.todayData));
//onActivated(()=>router.replace('./statistic') )
</script>

<style scoped>
.wrapper {
  border: 2vh solid darkgray;
  text-align: center;
  border-image-slice:50% 7% 10% 30% ;
  border-repeat:round;
  border-image-width: 1 0.3 0 0.5;
  border-image-outset: 0.01vw;
  margin:0.3vh;
  height: 90vh;
}
.el-row.total,.today_statistic,.barGraph{
  border:0.3vh solid lavenderblush;
  height: 10vh;
  line-height: 1.5vh;
  border-radius: 2vw;
  margin-top: 0.5vh;
}
.el-row.total,.today_statistic{
  font-size: 2rem;
  height: 10vh;
  line-height: 3rem;
  padding-top: 0.5vh;
  text-align: center;
}
.el-divider{
  height: 2vh;
  margin:0;
}
.today_statistic{
  height: 15vh;
  margin-top: 0.8vh;
}
.barGraph{
  height: 63vh;
  margin-top: 0.8vh;
  position: relative;
}
.barGraph>p{
  height: 4vh;
  line-height: 4vh;
  font-size: 2rem;
}
/*.pie{
  border: 0.3vh solid lavenderblush;
  border-top:0;
  border-radius: 1.3vh;
  border-collapse: collapse;
}*/
.divider{
  position: absolute;
  top: 50%;
  left: 50%;
  height:0.3vh;
  width: 100%;
  background-color: lavenderblush;
  transform:translate(-50%,-50%);
}
</style>