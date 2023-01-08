import data from '../data/data.json';//Все шмотки в непреобразованном виде - все ОК!
import currentData from './init_data';//Эталонный объект - все ОК!
import countValues from './count_parameters';//Функция для рассчета параметров - все ОК!
import show from './init_elements';//Для создания человека со шмотками - все ОК!
import showInfo from './create_info_panel';//Вывод инфы в окно - все ОК!
import buttonVisibleVontrol from './buttons_visible_control';//Для изменения активности кнопок
import initControl from './init_control';
import prepareAllVariants from './prepare_all_variants';//Тут по идее все ОК
export const beginData = data.sort(function(a, b) {
    if (a.type > b.type) {
      return 1;
    }
    if (a.type < b.type) {
      return -1;
    }    
    return 0;
  });

//Просто преобразование JSON в объект - все ОК!
const dataNow = countValues(beginData, JSON.parse(JSON.stringify(currentData)), 1);


show(beginData, 1);//Ничего не возвращают - ВСЕ ОК!
show(beginData, 0);//Ничего не возвращают - ВСЕ ОК!

showInfo('current-parameters',dataNow);//Все ОК!

document.addEventListener('DOMContentLoaded', function() {
    allVariants = prepareAllVariants(beginData);
    initControl();   
    buttonVisibleVontrol(document.getElementById('clear-all'), document.getElementById('clear-complect'), document.getElementById('clear-all-max'));
});

export let allVariants;//Экспорт огромного массива для рассчетных функций из других модулей




