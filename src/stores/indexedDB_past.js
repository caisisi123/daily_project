/*const re=indexedDB.deleteDatabase('planDB',1)
re.onsuccess=()=>{
    console.log('ss');
}*/

let request=window.indexedDB.open('PlanDB',2)

try{
    request.onupgradeneeded=function (event){
        const db=event.target.result;
        if (db.objectStoreNames.contains("plan")) {
            db.deleteObjectStore("plan");
        }
        const store=db.createObjectStore('plan',{keyPath:'id',autoIncrement:true})
        store.createIndex('date','date')
        store.createIndex('type','type')
        store.createIndex('all',['date','type','description'])
    }
    /*const plan1={date:'2023-03-09',type:'import-and-emergency',description:'page4',focusTime:0,complete:false}
    const plan2={date:'2023-03-08',type:'import-and-emergency',description:'page',focusTime:0,complete:false}*/
}catch(e){
    console.log(e);
}

function addPlan(plans){
        try{
            const openRequest=indexedDB.open('PlanDB',2);
            openRequest.onsuccess=function (event){
                const db=event.target.result;
                const ts=db.transaction('plan','readwrite');
                const store=ts.objectStore('plan');
                let addRequest=null;
                if(Array.isArray(plans)){
                    plans.forEach(plan=>{
                        addRequest=store.add(plan);
                    })
                }else{
                  addRequest= store.add(plans);
                }
                ts.oncomplete=function (){
                    db.close();
                    if(addRequest.error){
                        console.log('fail add');
                        return false
                    }else{
                        return true;
                    }
                }
            }
        }catch(e){
           return false
        }
}
function getByDate(date){
    return new Promise((resolve,reject)=>{
        try{
            const openRequest=indexedDB.open('PlanDB',2);
            openRequest.onsuccess=function (event) {
                const db = event.target.result;
                const ts = db.transaction('plan', 'readonly')
                const store = ts.objectStore('plan');
                const index = store.index('date');
                const request = index.getAll(date)
                request.onsuccess = function (event) {
                    resolve(event.target.result)
                    //console.log(event.target.result);
                }
                ts.oncomplete = () => {
                    db.close();
                    //  ts.commit()
                }
            }
        }catch (e){
            reject(e)
        }
    }).then(null,e=> console.log(e))

}


function getByType(type) {
    return new Promise((resolve,reject)=>{
        try{
            const openRequest = indexedDB.open('PlanDB', 2);
            openRequest.onsuccess = function (event) {
                const db = event.target.result;
                const ts = db.transaction('plan', 'readonly')
                const store = ts.objectStore('plan');
                const index = store.index('type');
                const request = index.getAll(type);
                request.onsuccess = function (event){
                    resolve(event.target.result)
                }
                ts.oncomplete = () => {
                    db.close()
                }
            }
        }catch (e){
        reject(e)}
    })



}

function update(obj,time){
    try{
    const openRequest=indexedDB.open('PlanDB',2);
    openRequest.onsuccess=function (event) {
        const db = event.target.result;
        const ts = db.transaction('plan', 'readwrite');
        const store = ts.objectStore('plan');
        const index = store.index('all');
        console.log('obj',obj);
        let request = index.get([obj.date, obj.type, obj.description]);
        request.onsuccess = (event) => {
            const data = event.target.result;
            if (!data) {
                addPlan(obj);
                return;
            }
            //console.log(data);
            data.focusTime = data.focusTime + time;
            request = store.put(data);
        }
        ts.oncomplete = () => {
            db.close();
            console.log('update');
        }
    }
    }catch(e){
        console.log(e);
    }
}
//这个store的数据结构
class Plan{
    constructor(date,type,description,focusTime) {
        this.date=date;
        this.type=type;
        this.description=description;
        this.focusTime=focusTime
    }
}
export {update,getByType,getByDate,Plan}
