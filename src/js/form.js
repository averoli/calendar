function formValidation(e) {
    switch (e.target.name) {
        case 'modal__title':
            if(reg.modal_title.test(e.target.value)) {
                modalTitle.classList.remove('validation_group-incorrect');
                modalTitle.classList.add('validation_group-correct');
                document.getElementById('icon1').classList.add('hide__element');
            }else{
                modalTitle.classList.add('validation_group-incorrect');
                modalTitle.classList.remove('validation_group-correct');
                document.getElementById('icon1').classList.remove('hide__element');
            }
            break;
        case 'modal__initial-date':
            console.log(initialDate.value);
            if(today.getTime()< initialDate.value.getTime()){

                initialDate.classList.remove('validation_group-incorrect');
                initialDate.classList.add('validation_group-correct');
                document.getElementById('icon2').classList.remove('hide__element');

            }else {
                initialDate.classList.add('validation_group-incorrect');
                initialDate.classList.remove('validation_group-correct');
                document.getElementById('icon2').classList.add('hide__element');
            }break;

        case 'modal__end-checkbox':
            
            endDate.disabled = !endDate.disabled
            break;

        case 'modal__end-date':
            if (initialDate.value.getDate()> finalDate.value.getDate()){
                endDate.classList.remove('validation_group-incorrect');
                endDate.classList.add('validation_group-correct');
                document.getElementById('icon3').classList.remove('hide__element');
            }else{
                endDate.classList.add('validation_group-incorrect');
                endDate.classList.remove('validation_group-correct');
                document.getElementById('icon1').classList.remove('hide__element');
            }break;

        case 'modal__reminder-checkbox':
          if (reminderCheckbox.checked) {
                    document.querySelector('#reminder__selection').classList.remove('hide__element');
                    
                }else{
                    document.querySelector('#reminder__selection').classList.add('hide__element');
                } break;

            case 'modal_description':
                if(!reg.modal_description.test(e.target.value)){
                    document.querySelector('#modal_description').classList.add('validation_group-incorrect');
                 
             }   break;
    }
}

export {formValidation}