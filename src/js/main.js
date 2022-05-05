//Import function from modules
// import {formValidation} from './form.js'
import {displayDayEvents} from './event.js'
import {calendarStructure } from './calendar-display.js';
calendarStructure(2022, 5)
/*
Constant declaration
*/
const calendar = document.querySelector('#calendar');
const modalCreateBtn = document.querySelector("#btn__create-event");
const modal = document.querySelector('#modal');
const modalContent = document.querySelector("#modal__content");
const closeModalBtn = document.querySelector('#modal__close');
const saveModalBtn = document.querySelector('#modal__save');
const modalForm = document.querySelector("#modal__form");
const modalTitle = document.getElementById('modal__title');
const initialDate = document.getElementById("modal__initial-date");
const endDate = document.getElementById("modal__end-date");
const endCheckbox = document.getElementById("modal__end-checkbox");
const reminderDiv = document.getElementById("reminder__section")
const reminderCheckbox = document.getElementById("modal__reminder-checkbox");
const eventDisplayList = Array.from(document.querySelectorAll("[data-date]"))
const calendarDayNumber = Array.from(document.querySelectorAll("[data-day='number']"))
const reg = {
    modal_title: /^.{4,60}$/ ,
    modal_description: /^.{0,500}$/
};
let today = new Date() // Refresh every 10s

//Open modal
modalCreateBtn.addEventListener('click', showModal)
modal.addEventListener('click', (e) => {
    if(e.target.id === "modal" || e.target.id === "modal__close"){
        hideModal()
}})

function showModal(){
    modal.classList.remove("hide__element")
}
function hideModal(){
    modal.classList.add("hide__element")
    document.getElementById("modal__form").reset()
}

//get Data
document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const initialDate = data["modal__initial-date"]
    saveEventData(data, initialDate)
    if (isSameMonth(today.toISOString(), initialDate)){
        displayDayEvents(data["modal__initial-date"].substring(0,10))
    }
    hideModal()
})

function isSameMonth(date1, date2){
    console.log(date1.substring(0,7) === date2.substring(0,7))
    return date1.substring(0,7) === date2.substring(0,7)
}

//Open modal from particular day
function saveEventData(event, date){

    const [year, month, day] = date.substring(0,10).split('-')
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

//Today as input value by default
// Date.prototype.toDateInputValue = () => {
//     let localTime = new Date()
//     localTime.setMinutes(localTime.getMinutes()-localTime.getTimezoneOffset()) //timeZone Support
//     return localTime.toJSON().slice(0,10)
// }
// document.getElementById("modal__initial-date").value = new Date().toDateInputValue();
// document.getElementById("modal__end-date").value = new Date().toDateInputValue();

calendar.addEventListener('click', (e) => {
    if(e.target.hasAttribute("data-event")){
        const day = e.target.parentNode
        modal.classList.toggle("hide__element")
    } else if (e.target.hasAttribute("data-create-event")){
        modal.classList.toggle("hide__element")
    } 
})

// // Show delete 
// calendar.addEventListener("mouseover" , (e) => {
//     if(e.target.hasAttribute("data-event")){
//         const child = e.target.children[0]
//         child.classList.remove("hide__element")
//     }
// })
// calendar.addEventListener('click', e =>{
//     if(e.target.hasAttribute("data-event-action")){
//         if (e.target.attributes["data-event-action"].nodeValue === "delete")
//             e.target.parentNode.remove()
//     }
// })

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
        i++
    }
}
// modalForm.addEventListener('click', formValidation) // --> Activate when incorporating form validation