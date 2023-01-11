/*********************************************************/
/* Service module for cleaning the necessary components. */
/*********************************************************/

import show from "./create_info_panel";
import showPers from './init_elements';
import changeAll from "./change_all";

//Clearing all input field values.
const clearInputsValues = () => {

    if (document.getElementById('accept').getAttribute('data-func') != 'clearInputsValues') return;

    document.querySelectorAll('.control-data__input input').forEach(el => {
        el.value = '0';
        el.classList.remove('reject');
    });
}
//Clear all sets
const clearComplect = () => {
    if (document.getElementById('accept').getAttribute('data-func') != 'clearComplect') return;   

    document.getElementById('item-now').innerHTML = 0;
    document.getElementById('item-all').innerHTML = 0;
    document.getElementById('increase').classList.add('disabled');
    document.getElementById('decrease').classList.add('disabled');
    changeAll([]);
    showPers([], 2);        
    show('count-parameters', null);
}

//Clearing all input fields and resetting all matched kits.
const clearAll = () => {
    const acceptButton = document.getElementById('accept');

    if (acceptButton.getAttribute('data-func') != 'clearAll') return;   

    acceptButton.setAttribute('data-func','clearInputsValues');
    clearInputsValues();

    acceptButton.setAttribute('data-func','clearComplect');
    clearComplect();
}

//Remove all spinners after count all values
const removeAllSpinners = () => {
    
    document.querySelectorAll('#field1>div').forEach(el => {
        el.innerHTML = '';
        el.classList.add('preview');
    });

    document.querySelector('.all__items-container').innerHTML = '';
    document.querySelector('.main-spinner').remove();
}

export {clearInputsValues, clearComplect, clearAll, removeAllSpinners}