// Create Event from parms {event: {eventInfo}, index: number}
const eventClass = {
    meeting: "event--meeting",
    personal: "event--personal",
    study: "event--study",
    coffeewith: "event--coffeewith",
    peerhelping: "event--peerhelping",
    workshop: "event--workshop",
    afterwork: "event--afterwork",
    beerwith: "event--beerwith"
    }

const createEvent = (params) => {
    const className = eventClass[params.event["modal_type"]]
    const title = params.event["modal__title"]
    const index = params.index
    const bin = `<span class="event__delete hide__element" data-event-action="delete">Delete</span>`
    return `<div class="${className} event" data-event="${index}" data-event-action="edit">${title}  ${bin}</div>`
}

// Date in format ISO string YYYY-MM-DDTHH:mm:ss.sssZ
function displayDayEvents (date){
    const tableDay = document.querySelector(`[data-date ="${date}"]`)
    console.log(tableDay)
        console.log(date)
        const [year, month, day] = date.split('-')
        const eventList = JSON.parse(localStorage.getItem('eventInfo'))[year][month][day]
        tableDay.innerHTML = ''
        for (let i = 0; i < eventList.length; i++){
            tableDay.innerHTML += createEvent({event: eventList[i], index: i})
        }
    try {
        const tableDay = document.querySelector(`[data-date ="${date}"]`)
        const [year, month, day] = date.split('-')
        const eventList = JSON.parse(localStorage.getItem('eventInfo'))[year][month][day]
        tableDay.innerHTML = ''
        for (let i = 0; i < eventList.length; i++){
            console.log("se tiene que crear un elemento")
            tableDay.innerHTML += createEvent({event: eventList[i], index: i})
        }
    } catch (error){
        console.log("Error accessing database")
    }
}

export {displayDayEvents}