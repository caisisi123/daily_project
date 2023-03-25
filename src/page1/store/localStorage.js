    /*import {ref} from 'vue'
    const template=[[],[],[],[]]
    const titles=['紧急不重要','重要且紧急','不重要不紧急','重要不紧急'];
    function getData(date){
        const data=localStorage.getItem(date)
        if(!data)
            return template;
        return JSON.parse(data)
    }
    function storeContext(date,title,content){
    //content is strings
        let data=localStorage.getItem(date);
        const index=titles.indexOf(title);
        if(!data){
            data=template;
        }else{
            data=JSON.parse(data);
        }
        data[index].push(content);//
        localStorage.setItem(date,JSON.stringify(data));
    }
    /!*function storeDate(date,data_arr){
        localStorage.setItem(date,JSON.stringify(data_arr))
    }
    function clearAll(){
        localStorage.clear()
    }
    function clearDate(date){
        localStorage.removeItem(date)
    }
    function removeTitle(date,title){
        let data=getData(date);
        let index=titles.indexOf(title);
        data[index]=[];
        localStorage.setItem(date,JSON.stringify(data));
    }*!/
    function findIndex(title){
        return titles.indexOf(title)
    }
    const storage1=Object.assign({},localStorage)
    for(const prop in storage1){
        storage1[prop]=JSON.parse(storage1[prop])
    }
    const storage=ref(storage1);
    export {storeContext,getData,findIndex,storage}*/