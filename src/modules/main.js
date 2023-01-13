/***************************************/
/* The main module of the application. */
/***************************************/
import readData from './read_data';
import CurrentData from './init_data';
import countValues from './count_parameters';
import show from './init_elements';
import showInfo from './create_info_panel';
import buttonVisibleControl from './buttons_visible_control';
import initControl from './init_control';
import prepareAllVariants from './prepare_all_variants';

const mainControl = (data) => {    

    localStorage.setItem('checkDataReady', 'false');

    beginData = data;    
    const dataNow = countValues(data, new CurrentData(), 1);
    
    show(data, 1);
    show(data, 0);

    showInfo('current-parameters',dataNow);

    initControl();   

    buttonVisibleControl(document.getElementById('clear-all'), document.getElementById('clear-complect'), document.getElementById('clear-all-max')); 
    
    if (typeof Worker !== 'undefined') {        

        const myWorker = new Worker('modules/web_worker.js');
        
        myWorker.postMessage(beginData);

        myWorker.onmessage = function(e) {            
            allVariants = e.data;                 
            myWorker.terminate();            
            localStorage.setItem('checkDataReady', 'true');     
        }
        myWorker.onerror = (e) => {
            allVariants = prepareAllVariants(dataNow);
            localStorage.setItem('checkDataReady', 'true');     
        }

    } else {             
        allVariants = prepareAllVariants(dataNow);
        localStorage.setItem('checkDataReady', 'true');
    }        
}

readData().then((data) => {
    mainControl(data);
});

export let allVariants, beginData;
