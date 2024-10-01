

let intervalToRepeateTask=()=>{
    let current = new Date()
    let hours = current.getHours()
    let weekday = current.getDay()
    let month = current.getMonth() + 1

    return hours
}

module.exports={
    intervalToRepeateTask
}