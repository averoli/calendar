 //const openModal = document.getElementById("modal");



const openModalDay = document.querySelectorAll(".table__day");

for(let i = 0; i < openModalDay.length; i++){
    openModalDay[i].onmouseenter = function(){
        openModalDay[i].textContent = '<i class="fa-solid fa-circle-plus aria-hidden="true""></i>'
    }
}


