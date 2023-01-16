/****************************************************************************************************/
/*Checking the correctness of pressing the pagination buttons and calling the functions for changing the selected set. */
/****************************************************************************************************/
import show from './create_info_panel';
import showPers from './init_elements';
import { beginData } from "./main";
import {result} from './find_all_variants';
import changeAll from "./change_all";

export default (direction) => {
    const itemNowValue = document.getElementById('item-now');
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');
    let currentNum = Number(itemNowValue.innerHTML);

    const res = (localStorage.getItem('check') == 'all') ? result : JSON.parse(localStorage.getItem('topValues'));
    

    if ((direction === 'dec' && currentNum <= 1) ||  (direction == 'inc' && (currentNum == res.length || currentNum == 0))) return;
    
    increaseButton.classList.remove('disabled');
    decreaseButton.classList.remove('disabled');

    switch (direction) {
        case 'inc':
            itemNowValue.innerHTML = ++currentNum;
            if (currentNum == res.length) increaseButton.classList.add('disabled');            
            break;
        case 'dec':
            itemNowValue.innerHTML = --currentNum;
            if (currentNum == 1) decreaseButton.classList.add('disabled');
            break;
    }   

    show('count-parameters', res[currentNum - 1]);
    showPers(beginData.filter((el, ind) => res[currentNum - 1].num.indexOf(ind) !== -1), 2);
    changeAll(res[currentNum - 1].num);    
}