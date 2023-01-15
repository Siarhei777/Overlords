/*******************************************************/
/*Search for all matches of kits with given parameters.*/
/*******************************************************/
import { allVariants } from "./main";
import show from "./create_info_panel";
import showPers from './init_elements';
import { beginData } from "./main";
import changeAll from "./change_all";
const result = [];
import {clearComplect} from "./clear_components";
import modifyParameters from "./modify_parameters";

const findAllVariants = () => {
    if (document.getElementById('accept').getAttribute('data-func') != 'findAllVariants') return;
    
    result.length = 0;

    const allData = document.querySelectorAll('.control-data__input input');      
    
    const forms = Array.from(allData).map(el => {
        return {
            value: el.value,
            name: el.name,
            command: (el.classList.contains('command') ? true : false)    
        }
    })
    

    const modData = beginData.map(el => modifyParameters(el));
    console.log(modData);

    if (typeof Worker !== 'undefined') {        

        const myWorker = new Worker('modules/web_worker.js');
        
        console.time('val1');

        const dataWorker = {
            object: modData,         
            forms,   
            func: 'find_all_variants'
        };

        console.time('val2');

        myWorker.postMessage(dataWorker);

        myWorker.onmessage = function(e) {            
            if (e.data) {
                result.push(e.data);
                /* console.log('find!'); */
            } else {
                myWorker.terminate();    
                console.timeEnd('val2');
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
            /* localStorage.setItem('checkDataReady', 'true');     
            document.getElementById('count-parameters').classList.remove('hide'); */
    
            
            
        }
        /* myWorker.onerror = (e) => {
            allVariants = prepareAllVariants(dataNow);
            localStorage.setItem('checkDataReady', 'true');     
        } */

    } else {             
        /* allVariants = prepareAllVariants(dataNow);
        localStorage.setItem('checkDataReady', 'true'); */
    }    













   /*  allVariants.forEach(element => {
        let check = true;        
        allData.forEach(el => {
            let val = Number(el.value);
            if (val) {                
                if (el.classList.contains('command')) {                    
                    if ((val && !element[`${el.name}`].commandValue && !element[`${el.name}`].commandPercent) || (element[`${el.name}`].commandValue && val > element[`${el.name}`].commandValue) || (element[`${el.name}`].commandPercent && val > element[`${el.name}`].commandPercent)) {
                        check = false;
                    }
                } else {
                    if ((val && !element[`${el.name}`].value && !element[`${el.name}`].percent) || (element[`${el.name}`].value && val > element[`${el.name}`].value) || (element[`${el.name}`].percent && val > element[`${el.name}`].percent)) {
                        check = false;
                    }                    
                }   
            }                
        });
        if (check) {
            result.push(element);            
        }
    });    
 */
/*     if (result.length) {
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
    }    */ 
};

export { findAllVariants, result };