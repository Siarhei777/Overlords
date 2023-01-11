//Маршрутизатор для управляющих кнопок:
import countMaxValues from './count_max_values';//Все по идее ОК??? - только добавить проверку атрибута
import userConfirm from './user_confirm';
import checkForm from './check_form';//Тут все ОК
import {findAllVariants} from './find_all_variants';//По идее все ОК??? - только добавить проверку атрибута
import clearAll from './clear_all';//Очистка всех input
import clearAllMax from './clear_all_max';//Очистка всего
import clearComplect from './clear_complect';//Очистка комплектов
import changeNumShow from './change_num_show';
import listItems from './list_items';

export default () => {    
    document.getElementById('max-values').addEventListener('click', () => {        
        userConfirm('Вы уверены, что хотите рассчитать максимально возможные параметры по всем имеющимся вещам?', 'countMaxValues');
    });
    document.getElementById('clear-all').addEventListener('click', () => {
        userConfirm('Вы уверены, что хотите очистить все поля ввода?', 'clearAll');
    });
    document.getElementById('clear-complect').addEventListener('click', () => {
        userConfirm('Вы уверены, что хотите сбросить найденные комплекты?', 'clearComplect');
    });
    document.getElementById('clear-all-max').addEventListener('click', () => {
        userConfirm('Вы уверены, что хотите сбросить все?', 'clearAllMax');
    });
    document.getElementById('inputed-values').addEventListener('click', () => {
        if (checkForm('#pers-data') && checkForm('#command-data')) {                                
            userConfirm('Вы уверены, что хотите найти все возможные варианты комплектов по заданным параметрам?', 'findAllVariants');            
        } else {
             userConfirm('Введены ошибочные данные!', '');  
        }
    });
    document.getElementById('accept').addEventListener('click', findAllVariants);
    document.getElementById('accept').addEventListener('click', countMaxValues);
    document.getElementById('accept').addEventListener('click', clearAll);

    document.getElementById('accept').addEventListener('click', clearAllMax);
    document.getElementById('accept').addEventListener('click', clearComplect);

    document.getElementById('decrease').addEventListener('click', function() {changeNumShow('dec')});
    document.getElementById('increase').addEventListener('click', function() {changeNumShow('inc')});

    document.getElementById('decrease2').addEventListener('click', listItems);
    document.getElementById('increase2').addEventListener('click', listItems);
}