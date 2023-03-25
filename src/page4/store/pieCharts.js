// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。

//await import (/*webpackPrefetch:true*/'echarts/core').then(m=>echarts=m.default)
//import * as echarts from 'echarts/core';
// 标签自动布局、全局过渡动画等特性
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    DatasetComponent,
    LegendComponent,
    TitleComponent,
    TransformComponent
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {SVGRenderer} from 'echarts/renderers';
import {PieChart} from 'echarts/charts'
//import {getByDate} from "@/stores/indexedDB";
//console.log(todayItemCount);


import {useTodayDataStore} from "@/page1/store/indexedDB";



const todayStore=useTodayDataStore()

const title=['紧急不重要','重要且紧急','不重要不紧急','重要不紧急']
const countLabel=[]
let ItemCountTemplate=Array(4).fill(0)
    ItemCountTemplate.map((val,index)=>{
     ItemCountTemplate[index]={name: title[index], value: 0};
})
import {  nextTick} from 'vue';
//import {labelInner} from "echarts/types/src/label/labelStyle";
// computed 在依赖更新时会标记为脏数据，但是不会重新计算，下次访问时才会计算。so制止刷新时计算。
const todayItemCount=(()=>{
   // console.log(todayStore.todayData);
    const type=[0,0,0,0];
    todayStore.todayData.forEach(obj=>{
        type[obj.type]++
    })
    ItemCountTemplate.forEach((obj,index)=> {
        if(type[index]>0) {
            obj.value = type[index];

        }
    });
   ItemCountTemplate= ItemCountTemplate.filter(obj=> {
       if(obj.value > 0){
          // console.log(obj);
           countLabel.push(obj.name);
           return true;
       }
   })
    return ItemCountTemplate;
})()
todayStore.$onAction(obj=>{
    if(obj.name==='pushStore'){
        nextTick(()=>{
            const index=obj.args[0].type
            //console.log(todayItemCount,index);
            if(!todayItemCount[index]) {
                todayItemCount[index] = {name: title[index], value: 0};
                countLabel.push(title[index]);
              //  console.log(todayItemCount, countLabel);
            }
           // console.log(todayItemCount);
            todayItemCount[index].value++
            myChart.setOption({series:[{name:'count',data:todayItemCount}],legend:[{data:countLabel,id:1}]})
        })
    }
})

const focusLabel=[]
const todayFocusTime=[];
todayStore.todayData.forEach(obj=>{
    if(obj.focusTime>0){
        todayFocusTime.push({name:obj.description,value:obj.focusTime});
        focusLabel.push(obj.description)
    }
})
todayStore.$onAction(obj=>{
    if(obj.name==='updateStoreTime'){
        nextTick(()=>{
            const object=obj.args[0].value
            const index =todayFocusTime.findIndex(item=>item.name===object.description)
            if(index===-1){
                todayFocusTime.push({name:object.description,value:object.focusTime+obj.args[1]});
                focusLabel.push(object.description)
            }else{
                todayFocusTime[index].value+=obj.args[1];
            }
            myChart.setOption({series:[{name:'focus',data:todayFocusTime}],legend:[{data:focusLabel,id:2}]})
        })

    }
})
/*today_array.forEach(obj=>{
    if(typeof obj.type!=="number")
        return
    todayFocusTime[obj.type].value+=obj.focusTime;
    todayItemCount[obj.type].value+=1;
})*/
//console.log(todayItemCount);
/*todayFocusTime=todayFocusTime.filter((obj,index)=>{
    return obj.value > 0;
})*/
/*
todayItemCount=todayItemCount.filter(obj=>obj.value>0)
todayStore.$onAction(obj=>{
    if(obj.name==='updateStore'){
        const [index,item]=obj.args;
        if(index!==-1){
            //
        }
    }
})
*/
/*let echarts=await import(/!*webpackPrefetch:true*!/'echarts/core');
// 注册必须的组件
echarts.use([
    TitleComponent,
    LegendComponent,
    DatasetComponent,
    TransformComponent,
    PieChart,
    LabelLayout,
    UniversalTransition,
    SVGRenderer,
]);*/
//import './echarts.min'

//console.log(echarts);


let myChart=null

function drawPie(dom){
     myChart=echarts.init(dom,null,);
    window.addEventListener('resize',()=>{
        myChart.resize()
    },{passive:true})
    myChart.setOption({
        //dimensions:['date','type','descriptions','focusTime'],
        lazyUpdate: true,
        title: [{
            text:'[计划优先级分布]',
            textStyle:{
                fontSize:'1.5rem',
            },
          //  top:'1%',


        },{
            textStyle:{
                fontSize:'1.5rem',

            },
            text:'[专注时长分布]',
            top:'50%',

        }],
        color:['yellow','pink','skyblue','greenyellow'],
        legend: [{
           // data:['紧急不重要','重要且紧急','不重要不紧急','重要不紧急'],
            //data:['a','b','c','d'],
            id:1,
            data:countLabel,
            top:'5%',
            orient:'vertical',
            left:'3%',
          //  formatter:`legend{name}`,
            itemWidth:10,
            itemHeight:10,
            itemStyle:{
              borderWidth:0,
            },
            selectedMode:false,
          //  itemGap:0,
           // padding:[5,5,2,5],
            textStyle:{
                fontSize:'1.3rem',
            },
        },{

            id:2,
            orient:'vertical',
            type:'scroll',
            top:'56%',
            left:'0',
            textStyle:{
                fontSize:'1.5rem',
            },
            itemWidth:10,
            itemHeight:10,
           /* formatter:function (obj){
                console.log(obj);
                if(obj==='focus'||['紧急不重要','重要且紧急','不重要不紧急','重要不紧急'].includes(obj))
                    return;
                return obj;
            },*/
           // data:['布局'],
            data:focusLabel,
        /*    itemWidth:'10',
            itemHeight:'10',*/
        },
        ],
     series:[
         {
        // color:['yellow','pink','skyblue','green'],
         type:'pie',
         radius: ['25%', '33%'],
         center: ['53%', '24%'],//圆心位置
        // stillShowZeroSum:false,
         top:-10,
         avoidLabelOverlap:true,
         showEmptyCircle:true,
         labelLine:{
                length:'10',
                length2:'15',
                align:'center',
         },
         label:{
           formatter:function (param){
               if(param.data.value===0)
                   return '';
               return `${param.data.value}条\n${param.data.name}`
           },
             overflow:'breakAll',
             alignTo:'labelLine',
             edgeDistance:'10%',
               // show:false,
            // alignTo:'edge',
          //   alignTo:'edge',
         },
        // center: ['50%', '50%'],
        //center: ['50%', '25%'],
             name:'count',
         data:todayItemCount,
             legendHoverLink:false,
         emphasis: {
             //disabled:false,
             scale:false,
            /* itemStyle: {
                 shadowBlur: 10,
                 shadowOffsetX: 0,
                 shadowColor: 'rgba(0, 0, 0, 0.5)'
             }*/
         },
     },{
            type:'pie',
             name:'focus',
             data:todayFocusTime,
             legendHoverLink:false,
             avoidLabelOverlap:true,
             showEmptyCircle:true,
            // stillShowZeroSum:false,
             center:['52%','73%'],
             radius:['25%','33%'],
            label:{
                formatter:function(params){
                    let total=params.data.value;
                    if(total===0){

                        return ''
                    }

                    let timeFormat=''+total+'秒';
                    if(total>=3600){
                        timeFormat=`${Math.floor(total/3600)}时${Math.floor(Math.floor(total%3600)/60)}分${Math.floor(total%60)}秒`
                    }else if(total>=60){
                        timeFormat=`${Math.floor(total/60)}分${total%60}秒`
                    }
                    return timeFormat+'\n'+params.data.name
                },
            },
             emphasis:{
                scale:false,
             }
         }
     ],

        /*graphic:[{
          //  invisible:true,
            type:'line',
            z:999,
            shape:{
                x1:0,
                x2:400,
                y1:340,
                y2:340,
            },
            style:{
                stroke:'lavenderblush',
                lineWidth:0,
            }
        }]*/

    })
}

/*const e=await import('echarts/core')
console.log(e);*/
export {drawPie,myChart}