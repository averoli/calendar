//Different ways to do monthDayNumbers function

// function monthDayNumbers(year, month){

//     const firstMonthDay = new Date(year, month  -1, 1)
//     const daysInMonth = new Date(year, month, 0).getDate()
//     const firstDayIndex = firstMonthDay.getDay()
//     const monthDays = []
//     for (let i = 1; i <= daysInMonth; i++){
//         monthDays[i+firstDayIndex-2] = i ;
//     }
//     return monthDays
// }
// function monthDayNumbers3(year,month){
//     const firstMonthDay = new Date(year, month  -1, 1)
//     const firstDayIndex = firstMonthDay.getDay()
//     const monthDays = []
//     for (let i= 0; i < 35; i++){
//         const day = new Date(year, month -1 , i - firstDayIndex +2).getDate()
//         monthDays.push(day)
//     }
//     return monthDays
// }