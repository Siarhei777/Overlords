/***********************************************/
/* The main control router of the application. */
/***********************************************/
import countMaxValues from './count_max_values';
import userConfirm from './user_confirm';
import checkForm from './check_form';
import {clearInputsValues, clearComplect, clearAll} from './clear_components';
import changeNumShow from './change_num_show';
import listItems from './list_items';
import { findAllVariants } from './find_all_variants';
import {topValues} from './top_values';

export default () => { 
    
    const checkLocalStorage = () => {
        return localStorage.getItem('checkDataReady');
    }

    const checkDataReady = (func) => {                     
        if (checkLocalStorage() == 'false') {            
            return;
        }
        else {            
            func();
        }
    }

    document.getElementById('max-values').addEventListener('click', () => {        
        userConfirm('Вы уверены, что хотите рассчитать максимально возможные параметры по всем имеющимся вещам?', 'countMaxValues');
    });
    document.getElementById('top5-values').addEventListener('click', () => {        
        userConfirm('Вы уверены, что хотите подобрать 5 лучших вариантов по параметрам: Урон + Шок + Броня?', 'topValues');
    });
    document.getElementById('clear-all').addEventListener('click', () => {
        userConfirm('Вы уверены, что хотите очистить все поля ввода?', 'clearInputsValues');
    });
    document.getElementById('clear-complect').addEventListener('click', () => {
        userConfirm('Вы уверены, что хотите сбросить найденные комплекты?', 'clearComplect');
    });
    document.getElementById('clear-all-max').addEventListener('click', () => {
        userConfirm('Вы уверены, что хотите сбросить все?', 'clearAll');
    });
    document.getElementById('inputed-values').addEventListener('click', () => {
        if (checkForm('#pers-data') && checkForm('#command-data')) {                                
            userConfirm('Вы уверены, что хотите найти все возможные варианты комплектов по заданным параметрам?', 'findAllVariants');            
        } else {
             userConfirm('Введены ошибочные данные!', '');  
        }
    });

    const acceptButton = document.getElementById('accept');

    acceptButton.addEventListener('click', function() {
        checkDataReady(findAllVariants);        
    });
    acceptButton.addEventListener('click', function() {
        checkDataReady(countMaxValues);        
    });
    acceptButton.addEventListener('click', function() {
        checkDataReady(topValues);
    });
    
    
    acceptButton.addEventListener('click', clearInputsValues);
    acceptButton.addEventListener('click', clearAll);
    acceptButton.addEventListener('click', clearComplect);

    document.getElementById('decrease').addEventListener('click', function() {changeNumShow('dec')});
    document.getElementById('increase').addEventListener('click', function() {changeNumShow('inc')});
    document.getElementById('decrease2').addEventListener('click', listItems);
    document.getElementById('increase2').addEventListener('click', listItems);
}