const classes = {
    weekday: 'calendar__table__weekday',
    dayInfo: 'calendar__table__day__info',
    monthNumber: 'month__number',
    monthNumberOut: 'month__number--out',
    createEvent: 'day__create-event',
    dayEvents: 'calendar__table__day__events'
}

const weekdays = {
    0: 'MON',
    1: 'TUE',
    2: 'WED',
    3: 'THU',
    4: 'FRI',
    5: 'SAT',
    6: 'SUN'
}

const weekday = params => {
    return `<div class="calendar__table__weekday"><p>${params.weekday}</p></div>`
}

const day = params => {
    return `<div class="${classes.dayInfo}">
                <span class="${classes.monthNumber} ${classes.monthNumber} data-day="number">${params.dayNumber}</span>
                <i class="${classes.createEvent} fa-solid fa-circle-plus" aria-hidden="true" data-event-action="create"></i>
            <div class="${classes.dayEvents}" data-date=${params.date}></div>
    `
}

function calendarStructure(year, month){
    const calendarSection = document.getElementById("calendar__table")
    const firstMonthDay = new Date(year, month  -1, 1)
    const firstDayIndex = firstMonthDay.getDay()
    const counterDay = new Date(year, month -1, -firstDayIndex +2)
    const monthDays = []
    for (let i= 0; i < 7; i++){
        calendarSection.innerHTML += weekday({weekday: weekdays[i]})
    }
    for (let i = 0; i <35; i++){
        const isoDate = counterDay.toISOString().substring(0,10)
        calendarSection.innerHTML += day({dayNumber: counterDay.getDate(), date: isoDate})
        counterDay.setDate(counterDay.getDate() + 1)
    }

}

export {calendarStructure}