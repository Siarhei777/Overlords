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

const mainControl = (data) => {    

    clearStorage();

    beginData = data;//allItems

    const dataNow = countValues(data.filter(el => el.now instanceof Array && el.now.indexOf(1) != -1), new CurrentData(), 1);//currentSet
    
    show(data, 1, 1);
    show(data, 0);

    showInfo('current-parameters',dataNow);

    initControl();   

    buttonVisibleControl(document.getElementById('clear-all'), document.getElementById('clear-complect'), document.getElementById('clear-all-max')); 
}

readData().then((data) => {
    mainControl(data);
});

export let beginData;