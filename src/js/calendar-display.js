const classes = {
    weekday: 'calendar__table__weekday',
    dayInfo: 'calendar__table__day__info',
    monthNumber: 'month__number',
    monthNumberOut: 'month__number--out',
    createEvent: 'day__create-event',
    dayEvents: 'calendar__table__day__events'
}

const weekdays = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT',
}

const weekday = params => {
    return `<div class="calendar__table__weekday"><p>${params.weekday}</p></div>`
}

const day = params => {
    return `<div class="calendar__table__day">
                <div class="${classes.dayInfo}">
                    <span class="${classes.monthNumber} ${params.monthNumberClass} data-day="number">${params.dayNumber}</span>
                    <i class="${classes.createEvent} fa-solid fa-circle-plus" aria-hidden="true" data-event-action="create"></i>
                </div>
            <div class="${classes.dayEvents}" data-date=${params.date}></div>
            </div>
    `
}

// Date in format ISO string YYYY-MM-DDTHH:mm:ss.sssZ
function isSameMonth(date1, date2){
    console.log(date1.substring(0,7) === date2.substring(0,7))
    return date1.substring(0,7) === date2.substring(0,7)
}

function calendarStructure(year, month){                                          //This line needs to be rewritten!!!!
    const calendarSection = document.getElementById("calendar__table")
    const firstMonthDay = new Date(year, month -1, 1)
    console.log(firstMonthDay)
    const counterDay = new Date(year, month -1, -firstMonthDay.getDay() +1)

    for (let i= 0; i < 7; i++){
        calendarSection.innerHTML += weekday({weekday: weekdays[i]})
    }
    for (let i = 0; i <35; i++){
        const counterIso = counterDay.toISOString().substring(0,10)
        //if (isSameMonth(counterIso, new Date().toISOString())){
            calendarSection.innerHTML += day({dayNumber: counterDay.getDate(), date: counterIso, monthNumberClass: `month__number`})
            counterDay.setDate(counterDay.getDate() + 1)
        //}
    }
}

export {calendarStructure}