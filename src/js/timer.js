setInterval(getEventsToday, 10000)


function getEventsToday(){
    let allEvents = JSON.parse(localStorage.getItem("eventInfo"));

    const today = new Date ();
    const todayArray = [today.getFullYear(), today.getMonth() + 1, today.getDay() + 1]
    let eventsToday = allEvents[todayArray[0]][todayArray[1]][todayArray[2]];
console.log(todayArray);
    if(eventsToday.length > 0){
        for(let i = 0; i < eventsToday.length; i++){
               let initTime  = eventsToday[i]["modal__initial-date"];
               let convertInitTime = new Date (initTime)
               let minInitTime = convertInitTime.getTime()/60/1000;
          let remindMin = Number(eventsToday[i]["modal__reminder-time"]);
          let remindTime = minInitTime - remindMin;
          let minToday = Math.round(today.getTime()/60/1000);

           if(minToday == remindTime){
               alert("KUKU")
           }
        }
    };
}
