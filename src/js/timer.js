
setInterval(getEventsToday, 10000)


function getEventsToday(){
    let allEvents = JSON.parse(localStorage.getItem("eventInfo"));
    const today = new Date ();
    const a = [today.getFullYear(), today.getMonth() + 1, today.getDay() + 1, today.getHours(), today.getMinutes()]
 
    let eventsToday = allEvents[todayArray[0]][todayArray[1]][todayArray[2]];
    if(eventsToday.length > 0){
        for(let i = 0; i < eventsToday.length; i++){
               let initTime  = eventsToday[i]["modal__initial-date"];
               let t = new Date (initTime)
               let min = t.getTime()/60/1000;
          let remindMin = Number(eventsToday[i]["modal__reminder-time"]);
          let remindTime = min - remindMin;
          let minToday = Math.round(today.getTime()/60/1000);

           if(minToday == remindTime){
               alert("KUKU")
           }
        }
    };
}
