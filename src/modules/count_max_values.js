/****************************************************************************************************/
/* Based on the resulting array, we select the maximum indicators and return them for subsequent output. */
/****************************************************************************************************/
import Data from './init_data';
import show from './create_info_panel';
import { beginData } from './main';
import modifyParameters from './modify_parameters';

export default () => {
    
    if (document.getElementById('accept').getAttribute('data-func') != 'countMaxValues') return;    
    
    localStorage.setItem('checkDataReady', 'false');
    let result = null;

    const modData = beginData.map(el => modifyParameters(el));
    console.log(modData);

    if (typeof Worker !== 'undefined') {        

        const myWorker = new Worker('modules/web_worker.js');
        
        console.time('val1');

        const dataWorker = {
            object: modData,            
            func: 'count_max_values'
        };

        myWorker.postMessage(dataWorker);

        myWorker.onmessage = function(e) {            
            result = e.data;      
            console.log(result);
            myWorker.terminate();            
            localStorage.setItem('checkDataReady', 'true');     
            document.getElementById('count-parameters').classList.remove('hide');
    
            console.timeEnd('val1');
            show('count-parameters', result);
        }
        /* myWorker.onerror = (e) => {
            allVariants = prepareAllVariants(dataNow);
            localStorage.setItem('checkDataReady', 'true');     
        } */

    } else {             
        /* allVariants = prepareAllVariants(dataNow);
        localStorage.setItem('checkDataReady', 'true'); */
    }    


/*     allVariants.forEach(el => {
        Object.keys(el).forEach(prop => {
            if (typeof el[prop] === 'object' && !(el[prop] instanceof Array)) {

                ['value', 'percent', 'commandValue', 'commandPercent'].forEach(innerProp => {
                    if (el[prop][innerProp] > result[prop][innerProp]) {
                        result[prop][innerProp] = el[prop][innerProp];
                    }    
                });
                
            }
        });
    }); */



    document.getElementById('count-parameters').classList.remove('hide');
    
    show('count-parameters', result);
    
}