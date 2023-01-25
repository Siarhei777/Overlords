/****************************************************************************************************/
/*Checking the correctness of pressing the pagination buttons and calling the functions for changing the selected set. */
/****************************************************************************************************/
import show from './create_info_panel';
import showPers from './init_elements';
import { beginData } from "./main";
import {result} from './find_all_variants';
import changeAll from "./change_all";
import countValues from './count_parameters';
import CurrentData from './init_data';

export default (direction, field) => {
    const itemNowValue = (field == 2) ? document.getElementById('item-now') : document.getElementById('item-now3');
    const increaseButton = (field == 2) ? document.getElementById('increase') : document.getElementById('increase3');
    const decreaseButton = (field == 2) ? document.getElementById('decrease') : document.getElementById('decrease3');
    let currentNum = Number(itemNowValue.innerHTML);    

    const res = (field == 1) ? null : (localStorage.getItem('check') == 'all') ? result : JSON.parse(localStorage.getItem('topValues'));

    const allLength = (field == 1) ? +document.getElementById('item-all3').innerHTML : (res) ? res.length : 0;
    
    if (direction === 'dec' && currentNum <= 1) return;
    if (direction == 'inc' && (currentNum == allLength || currentNum == 0)) return;    
    
    increaseButton.classList.remove('disabled');
    decreaseButton.classList.remove('disabled');

    switch (direction) {
        case 'inc':
            itemNowValue.innerHTML = ++currentNum;
            if (currentNum == allLength) increaseButton.classList.add('disabled');            
            break;
        case 'dec':
            itemNowValue.innerHTML = --currentNum;
            if (currentNum == 1) decreaseButton.classList.add('disabled');
            break;
    }   

    if ((!res || res.length == 0) && field != 1) {
        changeAll([]);
        showPers([], 2);        
        show('count-parameters', null);
    } else {
        if (field == 1) {
            show('current-parameters', countValues(beginData.filter(el => el.now instanceof Array && el.now.indexOf(currentNum) != -1), new CurrentData(), 1));
            showPers(beginData, 1, currentNum);
        } else {
            show('count-parameters', res[currentNum - 1]);
            showPers(beginData.filter((el, ind) => res[currentNum - 1].num.indexOf(ind) !== -1), 2);
            changeAll(res[currentNum - 1].num);    
        }        
    }    
}