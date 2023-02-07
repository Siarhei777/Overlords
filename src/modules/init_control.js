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
import { firstData } from "./main";
import { mainControl } from "./main";


import show from "./create_info_panel";
import showPers from './init_elements';
import changeAll from "./change_all";



export default () => { 

    let timer;

    //Потом вынести в отдельный модуль, так как есть дубль в find_all_variants:
    const getInputsData = () => Array.from(document.querySelectorAll('.control-data__input input')).map(el => {
        return {
            value: el.value, name: el.name, command: (el.classList.contains('command') ? true : false)
        }
    });
    
    const checkLocalStorage = () => {
        return localStorage.getItem('checkDataReady');
    }

    const checkDataReady = (func, num, maxData, inputs, type) => {                     
        if (checkLocalStorage() == 'false') {                 
            return;
        }
        else {        
            clearInterval(timer);
            func(num, maxData, inputs, type);
        }
    }

    document.getElementById('change-lvl').addEventListener('click', () => {       
        event.preventDefault();  
        userConfirm('Вы уверены, что хотите изменить уровень персонажа?', 'changeLevel');
    });

    document.getElementById('max-values').addEventListener('click', () => {        
        userConfirm('', 'countMaxValues');
    });
    document.getElementById('top5-values').addEventListener('click', () => {        
        userConfirm('', 'topValues');
        const button = document.getElementById('accept');
        timer = setInterval(() => {
            if (Array.from(document.querySelectorAll('.pers-checkboxes input, .command-checkboxes input')).filter(el => el.checked).length == 0) {
                button.classList.add('disabled');                
            } else {
                button.classList.remove('disabled');                
            }
        }, 10);
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
            userConfirm('', 'findAllVariants');
            const button = document.getElementById('accept');
            timer = setInterval(() => {
                if (Array.from(document.querySelectorAll('#pers-data input, #command-data input')).filter(el => Number(el.value) > 0).length == 0) {
                    button.classList.add('disabled');                
                } else {
                    button.classList.remove('disabled');
                }
            }, 10);
        } else {
             userConfirm('Введены ошибочные данные!', '');  
        }
    });

    const acceptButton = document.getElementById('accept');
    const rejectButton = document.getElementById('reject1');

    rejectButton.addEventListener('click', () => {
        clearInterval(timer);
        accept.classList.remove('disabled');
    });

    const getParameter = () => Array.from(document.querySelectorAll('.forms input')).filter(el => el.checked);
    
    const getCount = () => Number(document.querySelector('#count-top').value);

    const getButtleType = () => Array.from(document.querySelectorAll('#buttle-type input')).filter(el => el.checked)[0].id;

    acceptButton.addEventListener('click', function() {
        checkDataReady(findAllVariants, getParameter()[0].id, null, null, getButtleType());
    });
    acceptButton.addEventListener('click', function() {
        checkDataReady(countMaxValues, getParameter()[0].id, null, null, getButtleType());
    });
    acceptButton.addEventListener('click', function() {
        checkDataReady(topValues, getCount(), getParameter().map(el => el.value), getInputsData(), getButtleType());
    });
    acceptButton.addEventListener('click', function() {        
        if (document.getElementById('accept').getAttribute('data-func') != 'changeLevel') return;
        changeAll([]);
        showPers([], 2);        
        show('count-parameters', null);
        clearComplect();

        mainControl(firstData);
    });

    acceptButton.addEventListener('click', clearInputsValues);
    acceptButton.addEventListener('click', clearAll);
    acceptButton.addEventListener('click', clearComplect);

    document.getElementById('decrease').addEventListener('click', function() {changeNumShow('dec', 2)});
    document.getElementById('increase').addEventListener('click', function() {changeNumShow('inc', 2)});
    document.getElementById('decrease3').addEventListener('click', function() {changeNumShow('dec', 1)});
    document.getElementById('increase3').addEventListener('click', function() {changeNumShow('inc', 1)});

    document.getElementById('decrease2').addEventListener('click', listItems);
    document.getElementById('increase2').addEventListener('click', listItems);
}