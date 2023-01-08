import {result} from './find_all_variants';//Для пагинации
import show from './create_info_panel';
import showPers from './init_elements';//Для создания человека со шмотками - все ОК!
import { beginData } from "./main";
import changeAll from "./change_all";
export default (dir) => {
    let currentNum = Number(document.getElementById('item-now').innerHTML);
    if ((dir == 'dec' && Number(document.getElementById('item-now').innerHTML) <= 1) ||  (dir == 'inc' && (currentNum == result.length || currentNum == 0))) return;
    
    document.getElementById('increase').classList.remove('disabled');
    document.getElementById('decrease').classList.remove('disabled');

    switch (dir) {
        case 'inc':
            document.getElementById('item-now').innerHTML = ++currentNum;
            if (currentNum == result.length) document.getElementById('increase').classList.add('disabled');            
            break;
        case 'dec':
            document.getElementById('item-now').innerHTML = --currentNum;
            if (currentNum == 1) document.getElementById('decrease').classList.add('disabled');
            break;
    }   
    show('count-parameters', result[currentNum - 1]);
    showPers(beginData.filter((el, ind) => result[currentNum - 1].num.indexOf(ind) !== -1), 2);
    changeAll(result[currentNum - 1].num);
    
}