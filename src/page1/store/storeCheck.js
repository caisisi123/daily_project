function get_key (date,item,index){
    return `${date}-${item}-${index}`
}
function store_check(date,title,index,isCheck){
   const i=get_key(date,title,index)
    localStorage.setItem(i,JSON.stringify(isCheck))
}
function get_check(key){
    const check= localStorage.getItem(key)
    if(!check)
        return false;
    return JSON.parse(check);
}
export{get_check,store_check,get_key}