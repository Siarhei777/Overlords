import data from '../data/data'; //Все шмотки в непреобразованном виде - все ОК!
import readData from './read_data';
import currentData from './init_data';//Эталонный объект - все ОК!
import countValues from './count_parameters';//Функция для рассчета параметров - все ОК!
import show from './init_elements';//Для создания человека со шмотками - все ОК!
import showInfo from './create_info_panel';//Вывод инфы в окно - все ОК!
import buttonVisibleControl from './buttons_visible_control';//Для изменения активности кнопок
import initControl from './init_control';
import prepareAllVariants from './prepare_all_variants';//Тут по идее все ОК

const mainControl = (data) => {
    
    beginData = data;    
    const dataNow = countValues(data, JSON.parse(JSON.stringify(currentData)), 1);

    show(data, 1);
    show(data, 0);

    showInfo('current-parameters',dataNow);

    allVariants = prepareAllVariants(data);        
    initControl();   
    buttonVisibleControl(document.getElementById('clear-all'), document.getElementById('clear-complect'), document.getElementById('clear-all-max'));    
}

readData().then((data) => {
    mainControl(data);
});

export let allVariants, beginData;
