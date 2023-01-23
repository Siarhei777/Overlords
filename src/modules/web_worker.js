/************************************************/
/* creating the main data array using WebWorker */
/************************************************/
class Etalon {
    constructor() {
        this.sum3Parameters = {value: 0, percent: 0, name: 'Броня+Урон+Шок', commandValue: 0, commandPercent: 0, calculate: 0};
        this.allParameters = {value: 0, percent: 0, name: 'Сумма всех', commandValue: 0, commandPercent: 0, calculate: 0};
        this.allDamage = {value: 0, percent: 0, name: 'Общий урон', commandValue: 0, commandPercent: 0, calculate: 2};
        this.damagePhisical = {value: 0, percent: 0, name: 'Урон (Физич.)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damagePoison = {value: 0, percent: 0, name: 'Урон (Яд)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damageElectricity = {value: 0, percent: 0, name: 'Урон (Электр.)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damageWater = {value: 0, percent: 0, name: 'Урон (Вода)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damageFair = {value: 0, percent: 0, name: 'Урон (Огонь)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damageDead = {value: 0, percent: 0, name: 'Урон (Смерть)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.damageAstral = {value: 0, percent: 0, name: 'Урон (Астрал.)', commandValue: 0, commandPercent: 0, calculate: 1};
        this.initiative = {value: 0, percent: 0, name: 'Инициатива', commandValue: 0, commandPercent: 0, calculate: 2};
        this.accuracy = {value: 0, percent: 0, name: 'Точность атаки', commandValue: 0, commandPercent: 0, calculate: 2};
        this.shock = {value: 0, percent: 0, name: 'Шоковая атака', commandValue: 0, commandPercent: 0, calculate: 2};
        this.antiShock = {value: 0, percent: 0, name: 'Устойчивость к шоку', commandValue: 0, commandPercent: 0, calculate: 2};
        this.generalProtection = {value: 0, percent: 0, name: 'Общая защита', commandValue: 0, commandPercent: 0, calculate: 2};
        this.resistancePhysical = {value: 0, percent: 0, name: 'Сопр. (Физич.)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.poisonResistance = {value: 0, percent: 0, name: 'Сопр. (Яд)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.electricityResistance = {value: 0, percent: 0, name: 'Сопр. (Электр.)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.waterResistance = {value: 0, percent: 0, name: 'Сопр. (Вода)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.fairResistance = {value: 0, percent: 0, name: 'Сопр. (Огонь)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.deadResistance = {value: 0, percent: 0, name: 'Сопр. (Смерть)', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfGeneralProtection = {value: 0, percent: 0, name: 'Пробой общей защиты', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfPhysicalProtection = {value: 0, percent: 0, name: 'Пробой сопр. физ. урону', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfPoisonProtection = {value: 0, percent: 0, name: 'Пробой сопр. яду', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfElectricityProtection = {value: 0, percent: 0, name: 'Пробой сопр. электричеству', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfWaterProtection = {value: 0, percent: 0, name: 'Пробой сопр. воде', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfFairProtection = {value: 0, percent: 0, name: 'Пробой сопр. огню', commandValue: 0, commandPercent: 0, calculate: 2};
        this.breakdownOfDeadProtection = {value: 0, percent: 0, name: 'Пробой сопр. смерти', commandValue: 0, commandPercent: 0, calculate: 2};
        this.hp = {value: 0, percent: 0, name: 'Здоровье', commandValue: 0, commandPercent: 0, calculate: 2};
        this.damage = {value: 0, percent: 0, name: 'Урон', commandValue: 0, commandPercent: 0, calculate: 1};
    }
    countSomeParameters() {
        Object.keys(this).forEach(prop => {
            if (this[prop].value && this[prop].percent) {
                this[prop].value += Math.ceil((this[prop].value * this[prop].percent) / 100);
            }
        });

        this.allDamage.value = Object.keys(this).filter(prop => this[prop].calculate === 1).reduce((res, current) => res + this[current].value, 0);

        this.sum3Parameters.value = this.allDamage.value + this.generalProtection.value + this.shock.value;

        this.allParameters.value = Object.keys(this).filter(prop => this[prop].calculate === 2).reduce((res, current) => res + ((!this[current].value && this[current].percent) ? this[current].percent : (this[current].value) ? this[current].value : 0), 0);

    }
}
 
const findMaxValues = (el, rezArray) => {
    
        Object.keys(el).forEach(prop => {
            if (typeof el[prop] === 'object' && !(el[prop] instanceof Array)) {

                ['value', 'percent', 'commandValue', 'commandPercent'].forEach(innerProp => {
                    if (el[prop][innerProp] > rezArray[prop][innerProp]) {
                        rezArray[prop][innerProp] = el[prop][innerProp];
                    }    
                });
                
            }
        }); 
}


onmessage = (e) => {    
    const data = e.data.object;
    const rezArray = new Etalon();
    const funcName = e.data.func; 
    const filter = e.data.filter;
    const dataFields = e.data.fields;
    const topRezult = [];  
    const topCount = e.data.count;

    let forms;

    if (funcName == 'find_all_variants') {
        forms = e.data.forms;
        forms = forms.filter(el => Number(el.value) > 0);
    }
        
    const promArray = [];
    
    const all = [[], [], [], [], [], [], [], [], [], []];    

    const checkForms = (element, forms) => {
        
        let check = true;        
        forms.forEach(el => {
            let val = Number(el.value);
            
            if (el.command) {                    
                if ((val && !element[`${el.name}`].commandValue && !element[`${el.name}`].commandPercent) || (element[`${el.name}`].commandValue && val > element[`${el.name}`].commandValue) || (element[`${el.name}`].commandPercent && val > element[`${el.name}`].commandPercent)) {
                    check = false;
                }
            } else {
                if ((val && !element[`${el.name}`].value && !element[`${el.name}`].percent) || (element[`${el.name}`].value && val > element[`${el.name}`].value) || (element[`${el.name}`].percent && val > element[`${el.name}`].percent)) {
                    check = false;
                }                    
            }   
                     
        });

        return check;
    }


    const countVal = (arr) => {
        const res = new Etalon();
        
        res.num = [];

        let countTrapItems = 0, countLionItems = 0;

        arr.forEach((el, ind) => {
            if (el.complect == 2) {
                ++countTrapItems;
            }
            if (el.complect == 3) {
                ++countLionItems;
            }

            Object.keys(el).forEach(prop => {
                if (typeof el[prop] == 'object' && prop in res) {                    
                    res[prop].value += el[prop].value;
                    res[prop].percent += el[prop].percent;
                    res[prop].commandValue += el[prop].commandValue;
                    res[prop].commandPercent += el[prop].commandPercent;                    
                } else if (prop === 'num') {
                    res.num.push(el.num);
                }
            });            
        });

        if (countTrapItems >= 3) {        
            res.damage.value += 3;
            res.accuracy.value += 2;
            res.damage.percent += 3;
            res.damage.commandPercent += 3;            
        }
        if (countLionItems >= 3) {        
            res.damage.percent += 10;
            res.generalProtection.value += 10;
            res.hp.value += 130;
            res.damage.value += 10;
            res.hp.commandValue += 30;            
        }
            
        res.countSomeParameters();

        return res;
    };
     
    data.forEach((el, ind, arr) => {                
        arr[ind].num = ind;
        all[arr[ind].type - 1].push(ind);
    });       

        
    const countValFuctorial = (val, count) => {        
        if (count == 0) {
            return val;
        } else {
            return val + countValFuctorial(count, count - 1);
        }        
    }

    const countMultiple = (val, ...arr) => {
        return arr.reduce((iter, el) => iter * el, val);
    }

    const indexes = [];    
    let countAllValues;

    if (filter.includes('swords')) {
        indexes.push([{num: 0, start: 0}, {num: 1, start: 0}, {num: 2, start: 0}, {num: 3, start: 0}, {num: 5, start: 0}, {num: 6, start: 0}, {num: 7, start: 0}, {num: 8, start: 0}]);

        countAllValues = countMultiple(countValFuctorial(all[4].length - 1, all[4].length - 2), all[0].length, all[1].length, all[2].length, all[3].length, all[5].length, all[6].length, all[7].length, all[8].length);
    } else if (filter.includes('spears')) {
        indexes.push([{num: 0, start: 0}, {num: 2, start: 0}, {num: 3, start: 0}, {num: 5, start: 0}, {num: 6, start: 0}, {num: 8, start: 0}, {num: 9, start: 0}]);

        countAllValues = countMultiple(countValFuctorial(all[4].length - 1, all[4].length - 2), all[0].length, all[2].length, all[3].length, all[5].length, all[6].length, all[8].length, all[9].length);
    } else if (filter.includes('all')) {
        indexes.push([{num: 0, start: 0}, {num: 1, start: 0}, {num: 2, start: 0}, {num: 3, start: 0}, {num: 5, start: 0}, {num: 6, start: 0}, {num: 7, start: 0}, {num: 8, start: 0}]);
        indexes.push([{num: 0, start: 0}, {num: 2, start: 0}, {num: 3, start: 0}, {num: 5, start: 0}, {num: 6, start: 0}, {num: 8, start: 0}, {num: 9, start: 0}]);

        countAllValues = countMultiple(countValFuctorial(all[4].length - 1, all[4].length - 2), all[0].length, all[1].length, all[2].length, all[3].length, all[5].length, all[6].length, all[7].length, all[8].length) + countMultiple(countValFuctorial(all[4].length - 1, all[4].length - 2), all[0].length, all[2].length, all[3].length, all[5].length, all[6].length, all[8].length, all[9].length);
    } else {
        console.log('Error!');
    }


    let countProgress = 1; 
    let currentProgress = 0;   
    
    const val1Percent = Math.trunc(countAllValues / 100);

    indexes.forEach(arr => {
        for (let col1 = 0; col1 < all[4].length - 1; col1++) {
            for (let col2 = col1 + 1; col2 < all[4].length; col2++) {

                let checkEnd = arr.length - 2;
                
                do {
                    promArray.length = 0;
                    promArray.push(all[4][col1]);
                    promArray.push(all[4][col2]);
                    
                    arr.forEach(el => {
                        promArray.push(all[el.num][el.start]);
                    });                

                    if (++currentProgress == val1Percent) {
                        currentProgress = 0;
                        postMessage(++countProgress);
                    }

                    switch (funcName) {
                        case 'count_max_values':
                            findMaxValues(countVal((promArray.slice(0)).map(val => data[val])),rezArray);        
                            break;
                        case 'find_all_variants':
                            if (checkForms(countVal((promArray.slice(0)).map(val => data[val])), forms)) {
                                postMessage(countVal((promArray.slice(0)).map(val => data[val])));
                            }
                            break;
                        case 'top_values':
                            const vr = countVal((promArray.slice(0)).map(val => data[val]));

                            let vremSum = 0;
                            dataFields.forEach(el => {
                                if (el.includes('command')) {
                                    if (vr[el.substring(7).trim()].commandValue != 0) {
                                        vremSum += vr[el.substring(7).trim()].commandValue;
                                    } else {
                                        vremSum += vr[el.substring(7).trim()].commandPercent;
                                    }
                                } else {
                                    if (vr[el].value != 0) {
                                        vremSum += vr[el].value;
                                    } else {
                                        vremSum += vr[el].percent;
                                    }
                                }
                            });
                            
                            vr.sum3Parameters.value = vremSum;

                            if (topRezult.length < topCount) {
                                topRezult.push(vr);
                                if (topRezult.length == topCount) {
                                    topRezult.sort((a, b) => a.sum3Parameters.value - b.sum3Parameters.value).reverse();    
                                }                                
                            } else {
                                if (vr.sum3Parameters.value > topRezult[topCount - 1].sum3Parameters.value) {
                                    topRezult[topCount - 1] = Object.assign({}, vr);
                                    topRezult.sort((a, b) => a.sum3Parameters.value - b.sum3Parameters.value).reverse();
                                }
                            }
                    }

                    let checkMain = false;

                    for (let dop = arr.length - 1; dop >= checkEnd; dop--) {                        
                        if (checkEnd == -1) {
                            checkMain = true;
                            break;
                        }
                        
                        arr[dop]['start'] = arr[dop]['start'] + 1;
        
                        if (arr[dop].start < all[arr[dop]['num']].length) {
                            break;
                        } else {
                            arr[dop].start = 0;
                            if (dop == checkEnd) --checkEnd;                            
                        }                        
                    }                    
                    if (checkMain) break;
                } while (true);
            }
        }
    });
    
    switch (funcName) {
        case 'count_max_values':
            postMessage(rezArray);
            break; 
        case 'find_all_variants':
            postMessage(null);
            break; 
        case 'top_values':
            postMessage(topRezult);
            break; 
    }
}