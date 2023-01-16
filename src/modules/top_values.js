/*******************************************************/
/*Search TOP-5 sets*/
/*******************************************************/
import show from "./create_info_panel";
import showPers from './init_elements';
import { beginData } from "./main";
import changeAll from "./change_all";
import {clearComplect} from "./clear_components";
import modifyParameters from "./modify_parameters";

const topValues = () => {
    if (document.getElementById('accept').getAttribute('data-func') != 'topValues') return;

    let result = [];
    
    const topValues = JSON.parse(localStorage.getItem ("topValues"));
    localStorage.setItem('check', 'top');
    if (topValues) {
        result = topValues.slice(0);
        document.getElementById('count-parameters').classList.remove('hide');             
        showPers(beginData.filter((el, ind) => result[0].num.indexOf(ind) !== -1), 2);
        changeAll(result[0].num);
        show('count-parameters', result[0]);
        document.getElementById('item-now').innerHTML = 1;
        document.getElementById('item-all').innerHTML = result.length;
        if (result.length > 1) {
            document.getElementById('increase').classList.remove('disabled');
        }
    } else {
        result.length = 0;
   
        const modData = beginData.map(el => modifyParameters(el));
        console.log(modData);
        document.getElementById('main-spinner').style.animationName = '';
    
        let countVal = 0;
    
        if (typeof Worker !== 'undefined') {        
    
            const myWorker = new Worker('modules/web_worker.js');
            
            console.time('val1');
    
            const dataWorker = {
                object: modData,            
                func: 'top_values'
            };
    
            console.time('val2');
    
            myWorker.postMessage(dataWorker);
    
            myWorker.onmessage = function(e) {
                if (typeof e.data == 'number') {
                    changeVisibleElements(`Осуществляется поиск...`, 'false', true, false, e.data);
                } else {
                    result = e.data.slice(0);                
                    localStorage.setItem('result', JSON.stringify(result));
                    localStorage.setItem('topValues', JSON.stringify(result));
                    myWorker.terminate();    
                    console.timeEnd('val2');
        
                    document.getElementById('main-spinner').style.animationName = 'slowHide';
        
                    setTimeout(() => {
                        changeVisibleElements('', 'true', false, true);
                    }, 2000);
        
                    if (result.length) {
                        document.getElementById('count-parameters').classList.remove('hide');             
                        showPers(beginData.filter((el, ind) => result[0].num.indexOf(ind) !== -1), 2);
                        changeAll(result[0].num);
                        show('count-parameters', result[0]);
                        document.getElementById('item-now').innerHTML = 1;
                        document.getElementById('item-all').innerHTML = result.length;
                        if (result.length > 1) {
                            document.getElementById('increase').classList.remove('disabled');
                        }
                    } else {
                        document.getElementById('item-now').innerHTML = 0;
                        document.getElementById('item-all').innerHTML = 0;
                        document.getElementById('increase').classList.add('disabled');
                        document.getElementById('decrease').classList.add('disabled');
                        changeAll([]);
                        showPers([], 2);        
                        show('count-parameters', null);
                        clearComplect();
                    }
                }            
            }
            myWorker.onerror = (e) => {
                /* Add error info! */
            }
    
        } else {             
            /* Add error info! */
        }
    }        


    const progress = document.getElementById('main-spinner');

    const changeVisibleElements = (text, storage, visible, infoVisible, val = 0) => {
        localStorage.setItem('checkDataReady', storage);        
        (visible) ? progress.classList.remove('hidden') : progress.classList.add('hidden');
        progress.querySelector('.progress-bar').style.width = `${val}%`;
        progress.querySelector('.progress-bar').setAttribute('aria-valuenow', val);        
        progress.querySelector('.progress__info').classList.remove('hidden');
        progress.querySelector('.progress__info').innerHTML = text;

    }

    
};
export {topValues}