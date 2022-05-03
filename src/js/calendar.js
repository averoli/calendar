const openModalDay = document.querySelectorAll(".table__day");
const modal = document.querySelector("#modal");

function getAllDaysInMonth(year, month) {
  const date = new Date(year, month, 1);

  const dates = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

const date = new Date("2022-03-24");
const d = new Date();
const tommorow = d + 1

console.log(d);

// 👇️ All days in March of 2022
console.log(getAllDaysInMonth(date.getFullYear(), date.getMonth()));

for (let i = 0; i < openModalDay.length; i++) {
  openModalDay[i].onmouseenter = function () {
    openModalDay[i].innerHTML =
      '<i class="fa-solid fa-circle-plus aria-hidden="true""></i>';

    openModalDay[i].addEventListener("click", () => {
      modal.classList.toggle("hide__element");
    });
  };

  openModalDay[i].onmouseleave = function () {
    openModalDay[i].innerHTML = "";
  };
}


