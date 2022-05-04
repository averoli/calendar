const closeModalBtn = document.querySelector('#modal__close');
const modal = document.querySelector('#modal');
const saveModalBtn = document.querySelector('#modal__save');
const header = document.querySelector('#header');

const modalCreateBtn = document.querySelector("#btn__create-event")
const modalContent = document.querySelector("#modal__content")

modalCreateBtn.addEventListener('click', () => {modal.classList.toggle("hide__element")})

modal.addEventListener('click', (e) => {
    if(e.target.id ==="modal" || e.target.id === "modal__close"){
        modal.classList.toggle("hide__element")
}})

//get Data
document.querySelector('form')
    .addEventListener('submit', e =>{
        e.preventDefault()
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        const initialDate = data["modal__initial-date"].split('-').map(a => parseInt(a))
        saveEventData(data, ...initialDate)
    })

function saveEventData(event, year, month, day){
  
    let data = JSON.parse(localStorage.getItem("eventInfo"))

    if (data === null){
        data = {}
    }
    if (data[year] === undefined){
        data[year] = {}
    }
    if(data[year][month] === undefined){
        data[year][month] = {}
    } 
    if (data[year][month][day] === undefined){
        data[year][month][day] = [event]
    } else {
        data[year][month][day].push(event)
    }
    localStorage.setItem("eventInfo", JSON.stringify(data))
}

function clearFormData(){
    document.getElementById("modal__form").reset()
}

//Today as input value by default
Date.prototype.toDateInputValue = () => {
    let localTime = new Date()
    localTime.setMinutes(localTime.getMinutes()-localTime.getTimezoneOffset()) //timeZone Support
    return localTime.toJSON().slice(0,10)
}

document.getElementById("modal__initial-date").value = new Date().toDateInputValue();
document.getElementById("modal__end-date").value = new Date().toDateInputValue();

function monthDayNumbers(year, month){
    const firstMonthDay = new Date(year, month  -1, 1)
    const firstDayIndex = firstMonthDay.getDay()
    const counterDay = new Date(year, month -1, -firstDayIndex +2)
    const monthDays = []
    for (let i= 0; i < 35; i++){
        monthDays.push(counterDay.getDate())
        counterDay.setDate(counterDay.getDate() + 1)
    }
    return monthDays
}
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






