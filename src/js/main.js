/*Import*/
import {displayDayEvents} from './event.js'

/*Constant declaration*/
const header = document.querySelector('#header');
const calendar = document.querySelector('#calendar');
const modal = document.querySelector('#modal');
const closeModalBtn = document.querySelector('#modal__close');
const saveModalBtn = document.querySelector('#modal__save');
const modalCreateBtn = document.querySelector("#btn__create-event")
const modalContent = document.querySelector("#modal__content")


// Open/Close modal
modalCreateBtn.addEventListener('click', () => {modal.classList.toggle("hide__element")})
modal.addEventListener('click', (e) => {
    if(e.target.id ==="modal" || e.target.id === "modal__close"){
        modal.classList.toggle("hide__element")
}})

// Submit
document.querySelector('form').addEventListener('submit', e =>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
        )
    const initialDate = data["modal__initial-date"].split('-').map(a => parseInt(a))
    const initialDate_bis = data["modal__initial-date"]
    const tableIndex = new Date(...initialDate).getDate()
    const eventsUpdated = saveEventData(data, initialDate)
    
})

function selectDay(data){
    const tableDays = document.querySelectorAll("#calendar__table td")
    return new Date(...data).getDate() + new Date()
}


//Save event data from Form, order day elements by initial Date
function saveEventData(event, year, month, day){
    
    // const {year, month, day} = args
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
    return data
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
    for (let i= 0; i < 35; i++){ //need to put 35, something more generic
        monthDays.push(counterDay.getDate())
        counterDay.setDate(counterDay.getDate() + 1)
    }
    return monthDays
}

calendar.addEventListener('click', (e) => {
    if(e.target.hasAttribute("data-event")){
        const day = e.target.parentNode
        modal.classList.toggle("hide__element")
    } else if (e.target.hasAttribute("data-create-event")){
        modal.classList.toggle("hide__element")
    } 
})


// Show delete 
calendar.addEventListener("mouseover" , (e) => {
    if(e.target.hasAttribute("data-event")){
        const child = e.target.children[0]
        child.classList.remove("hide__element")
    }
})

calendar.addEventListener('click', e =>{
    if(e.target.hasAttribute("data-event-action")){
        if (e.target.attributes["data-event-action"].nodeValue === "delete")
            e.target.parentNode.remove()
    }
})

//Delete event from localStorage and return updated event day array
function deleteEvent(index,...date){
    const {year, month, day} = date
    const data = JSON.parse(localStorage.getItem('eventInfo'))
    data[year][month][day].splice(index, 1)
    localStorage.setItem('eventInfo', JSON.stringify(data))
    return data[year][month][day]
}

// Update Form Display data from eventInfo --> List containing info from an Event
function updateFormData(eventInfo){
    const formInputs = document.querySelectorAll("#modal__form [data-event-info]")
    let i = 0
    for (const info of eventInfo){
        formInputs[i].value = info
        console.log(info, formInputs[i]);
        i++
    }
}

