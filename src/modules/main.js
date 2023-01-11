/***************************************/
/* The main module of the application. */
/***************************************/
import data from '../data/data';
import readData from './read_data';
import currentData from './init_data';
import countValues from './count_parameters';
import show from './init_elements';
import showInfo from './create_info_panel';
import buttonVisibleControl from './buttons_visible_control';
import initControl from './init_control';
import prepareAllVariants from './prepare_all_variants';
import { removeAllSpinners } from './clear_components';

const mainControl = (data) => {
    
    beginData = data;    
    const dataNow = countValues(data, JSON.parse(JSON.stringify(currentData)), 1);

    removeAllSpinners();

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
