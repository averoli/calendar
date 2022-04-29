
//get Data
document.querySelector('form')
    .addEventListener('submit', e =>{
        e.preventDefault()
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        year, month, day = getDate(stringDate)
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

function getDate(date){
    
}

