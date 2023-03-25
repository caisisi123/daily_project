
const today=new Date()
const todayFormat=`${today.getFullYear()}-`+`${today.getMonth()+1}`.padStart(2,'0')+'-'+`${today.getDate()}`.padStart(2,'0')
export {todayFormat}