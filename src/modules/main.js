/***************************************/
/* The main module of the application. */
/***************************************/
import clearStorage from './clear_storage';
import readData from './read_data';
import CurrentData from './init_data';
import countValues from './count_parameters';
import show from './init_elements';
import showInfo from './create_info_panel';
import buttonVisibleControl from './buttons_visible_control';
import initControl from './init_control';
import { initAll, initInfoElements } from './init_info_block';

const changeLevel = data => data.filter(el => el.level <= Number(document.getElementById('level-value').value));

const mainControl = (data) => {    

    firstData = data;

    console.log(firstData);

    clearStorage();
    document.getElementById('all-items').innerHTML = '';

    beginData = changeLevel(data);//allItems

    allItemsArrays = initAll(beginData);    

    initInfoElements(allItemsArrays);

    const dataNow = countValues(beginData.filter(el => el.now instanceof Array && el.now.indexOf(1) != -1), new CurrentData(), 1);//currentSet
    
    show(beginData, 1, 1);
    show(beginData, 0);

    showInfo('current-parameters',dataNow);

    initControl();   

    buttonVisibleControl(document.getElementById('clear-all'), document.getElementById('clear-complect'), document.getElementById('clear-all-max')); 
}

readData().then((data) => {
    mainControl(data);
});

export let beginData;
export let allItemsArrays;
export let firstData;
export {mainControl};