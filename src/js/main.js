const closeModalBtn = document.querySelector('#modal__close');
const modal = document.querySelector('#modal');
const saveModalBtn = document.querySelector('#modal__save');
const header = document.querySelector('#header');
const calendar = document.querySelector('#calendar');
const modalCreateBtn = document.querySelector("#btn__create-event");
const modalContent = document.querySelector("#modal__content");
const modalForm = document.querySelector("#modal__form");
const modalTitle = document.getElementById('modal__title');
const initialDate = document.getElementById("modal__initial-date");
const today = new Date();
const endDate = document.getElementById("modal__end-date");
const endCheckbox = document.getElementById("modal__end-checkbox");
const reminderDiv = document.getElementById("reminder__section")
const reminderCheckbox = document.getElementById("modal__reminder-checkbox");

const reg = {
    modal_title: /^.{4,60}$/ ,
    modal_description: /^.{0,500}$/
};


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
    console.log(localTime.toJSON())
    return localTime.toJSON().slice(0,10)
}

document.getElementById("modal__initial-date").value = new Date().toDateInputValue();
document.getElementById("modal__end-date").value = new Date().toDateInputValue();
console.log(document.getElementById("modal__initial-date").value);






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
    
//form validation//


function formValidation(e) {
    switch (e.target.name) {
        case 'modal__title':
            if(reg.modal_title.test(e.target.value)) {
                modalTitle.classList.remove('validation_group-incorrect');
                modalTitle.classList.add('validation_group-correct');
                document.getElementById('icon1').classList.add('hide__element');
            }else{
                modalTitle.classList.add('validation_group-incorrect');
                modalTitle.classList.remove('validation_group-correct');
                document.getElementById('icon1').classList.remove('hide__element');
            }
            break;
        case 'modal__initial-date':  
            console.log(initialDate.value);
            if(today.getTime()< initialDate.value.getTime()){

                initialDate.classList.remove('validation_group-incorrect');
                initialDate.classList.add('validation_group-correct');
                document.getElementById('icon2').classList.remove('hide__element');

            }else {
                initialDate.classList.add('validation_group-incorrect');
                initialDate.classList.remove('validation_group-correct');
                document.getElementById('icon2').classList.add('hide__element');
            }break;

        case 'modal__end-checkbox':
            
            endDate.disabled = !endDate.disabled
            break;

        case 'modal__end-date':
            if (initialDate.value.getDate()> finalDate.value.getDate()){
                endDate.classList.remove('validation_group-incorrect');
                endDate.classList.add('validation_group-correct');
                document.getElementById('icon3').classList.remove('hide__element');
            }else{
                endDate.classList.add('validation_group-incorrect');
                endDate.classList.remove('validation_group-correct');
                document.getElementById('icon1').classList.remove('hide__element');
            }break;

        case 'modal__reminder-checkbox':
          if (reminderCheckbox.checked) {
                    document.querySelector('#reminder__selection').classList.remove('hide__element');
                    
                }else{
                    document.querySelector('#reminder__selection').classList.add('hide__element');
                } break;

            case 'modal_description':
                if(!reg.modal_description.test(e.target.value)){
                    document.querySelector('#modal_description').classList.add('validation_group-incorrect');
                 
             }   break;

        
    }

}

modalForm.addEventListener('click', formValidation)