const closeModalBtn = document.querySelector('#modal__close');
const modal = document.querySelector('#modal');
const saveModalBtn = document.querySelector('#modal__save');
const header = document.querySelector('#header');
const calendar = document.querySelector('#calendar');


document.addEventListener('click', function(event) {
    if (modal.classList.contains("hide__element")){
        hideModal(event)
    }else {
        
    }


})


document.addEventListener(
	"click",
	function hideModal(event) {

		if (
			event.target.closeModalBtn|| event.target.closeSaveBtn || !event.target.modal
		) {
			closeModal();
		}
	},
	false
);

function closeModal() {
	modal.classList.toggle('hide__element')
	header.classList.toggle('hide__element')
	calendar.classList.toggle('hide__element')

}

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
