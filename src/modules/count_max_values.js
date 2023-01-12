/****************************************************************************************************/
/* Based on the resulting array, we select the maximum indicators and return them for subsequent output. */
/****************************************************************************************************/
import Data from './init_data';
import show from './create_info_panel';
import { allVariants  } from './main';

export default () => {
    
    if (document.getElementById('accept').getAttribute('data-func') != 'countMaxValues') return;

    const result = new Data();
    
    allVariants.forEach(el => {
        Object.keys(el).forEach(prop => {
            if (typeof el[prop] === 'object' && !(el[prop] instanceof Array)) {
                if (el[prop].value > result[prop].value) {
                    result[prop].value = el[prop].value;
                }
                if (el[prop].percent > result[prop].percent) {
                    result[prop].percent = el[prop].percent;
                }
                if (el[prop].commandValue > result[prop].commandValue) {
                    result[prop].commandValue = el[prop].commandValue;
                }
                if (el[prop].commandPercent > result[prop].commandPercent) {
                    result[prop].commandPercent = el[prop].commandPercent;
                }
            }
        });
    });

    document.getElementById('count-parameters').classList.remove('hide');
    
    show('count-parameters', result);
    
}