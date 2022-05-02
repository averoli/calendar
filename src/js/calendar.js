
const openModalDay = document.querySelectorAll(".table__day");
const modal = document.querySelector('#modal');

for(let i = 0; i < openModalDay.length; i++){
    openModalDay[i].onmouseenter = function(){
        openModalDay[i].innerHTML = '<i class="fa-solid fa-circle-plus aria-hidden="true""></i>';
        openModalDay[i].addEventListener('click', () => {modal.classList.toggle("hide__element")})
        
    }
    

    openModalDay[i].onmouseleave = function(){
        openModalDay[i].innerHTML = ''
    }
}


