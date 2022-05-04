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
    const className = eventClass[params.event.type]
    const title = params.event.title
    const index = params.index
    const bin = `<span class="event__delete hide__element" data-event-action="delete">Delete</span>`
    return `<div class="${className} event" data-event="${index}" data-event-action="edit">${title}  ${bin}</div> <br>`
}

function displayDayEvents (eList, day){
    day.innerHMTL = ''
    for (let i = 0; i < eList.length; i++){
        const event = createEvent({event: eList[i], index: i})
        day.innerHTML += event
    }
}

export {displayDayEvents}