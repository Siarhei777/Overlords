import data from './init_data';//Все Ок
import show from './create_info_panel';//Все ОК
import { allVariants  } from './main';//Все ОК

export default () => {
    
    if (document.getElementById('accept').getAttribute('data-func') != 'countMaxValues') return;

    const result = JSON.parse(JSON.stringify(data));    
    
    allVariants.forEach(el => {
        for (let prop in el) {
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
        }
    });

    document.getElementById('count-parameters').classList.remove('hide');
    
    show('count-parameters', result);
    

    /* Завтра еще тут поискать вакансии: */
    /* https://by.jobvk.com/minsk/obrazovatelyniy-tsentr-parka-visokih-tehnologiy */    
}