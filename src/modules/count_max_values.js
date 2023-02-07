/****************************************************************************************************/
/* Based on the resulting array, we select the maximum indicators and return them for subsequent output. */
/****************************************************************************************************/
import show from './create_info_panel';
import { beginData } from './main';
import modifyParameters from './modify_parameters';

export default (num, dat, inp, type) => {

    const progress = document.getElementById('main-spinner');

    const changeVisibleElements = (text, storage, visible, infoVisible, val = 0) => {
        localStorage.setItem('checkDataReady', storage);        
        (visible) ? progress.classList.remove('hidden') : progress.classList.add('hidden');
        progress.querySelector('.progress-bar').style.width = `${val}%`;
        progress.querySelector('.progress-bar').setAttribute('aria-valuenow', val);        
        progress.querySelector('.progress__info').classList.remove('hidden');
        progress.querySelector('.progress__info').innerHTML = text;
    }

    const checkStorage = (fieldName) => JSON.parse(localStorage.getItem(fieldName));
    
    if (document.getElementById('accept').getAttribute('data-func') != 'countMaxValues') return;

    const readyValues = checkStorage(`maxValues_${num}`);

    if (readyValues) {
        document.getElementById('count-parameters').classList.remove('hide');
    
        show('count-parameters', readyValues);
    } else {
        changeVisibleElements('Рассчитываем параметры...', 'false', true, false);

        let result = null;
    
        const modData = beginData.map(el => modifyParameters(el));    
        
        console.log(modData);
    
        if (typeof Worker !== 'undefined') {        
    
            const myWorker = new Worker('modules/web_worker.js');
                
            const dataWorker = {
                object: modData,     
                filter: num,
                type: type,
                func: 'count_max_values'
            };
    
            myWorker.postMessage(dataWorker);
            document.getElementById('main-spinner').style.animationName = '';
    
            myWorker.onmessage = function(e) {       
                if (typeof e.data == 'number') {
                    changeVisibleElements('Рассчитываем параметры...', 'false', true, false, e.data);
                } else {
                    changeVisibleElements('Рассчитываем параметры...', 'false', true, false, 100);
    
                    result = e.data;      
                    console.log(result);

                    switch (true) {
                        case num == 'swords':
                            localStorage.setItem('maxValues_swords', JSON.stringify(result));        
                            break;
                        case num == 'spears':
                            localStorage.setItem('maxValues_spears', JSON.stringify(result));        
                            break;
                        case num == 'all':
                            localStorage.setItem('maxValues_all', JSON.stringify(result));        
                            break;
                    }
               
                    myWorker.terminate();   
    
                    document.getElementById('main-spinner').style.animationName = 'slowHide';
    
                    setTimeout(() => {
                        changeVisibleElements('', 'true', false, true);
                    }, 2000);
                    
                    document.getElementById('count-parameters').classList.remove('hide');
                                
                    show('count-parameters', result);
                }            
            }
            myWorker.onerror = (e) => {
                /*Add error info*/
            }
    
        } else {             
            /*Add error info*/
        }        
    }    
}