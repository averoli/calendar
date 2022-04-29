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
