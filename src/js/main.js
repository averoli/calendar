
//get Data
document.querySelector('form')
    .addEventListener('submit', e =>{
        e.preventDefault()
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        const initialDate = data["event__initial-date"].split('-').map(a => parseFloat(a))
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