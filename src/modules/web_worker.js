
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
 
onmessage = (e) => {    
    const type = e.data.type;
    const data = e.data.object;
    const rezArray = new Etalon();
    const funcName = e.data.func;
    const filter = e.data.filter;
    const dataFields = e.data.fields;
    const topRezult = [];
    const topCount = e.data.count;
    const checkControlDataForms = e.data.paramForms;
    let forms;

    if (funcName == 'find_all_variants' || funcName == 'top_values') {
        postMessage(-1);
        forms = e.data.forms;
        forms = forms.filter(el => Number(el.value) > 0);
    }    
        
    const all = [[], [], [], [], [], [], [], [], [], []];

    const countAllTop = (elem) => {
        dataFields.forEach(el => {
            if (el.includes('command')) {
                if (elem[el.substring(7).trim()].commandValue != 0) {
                    elem.sum3Parameters.value += elem[el.substring(7).trim()].commandValue;
                } else {
                    elem.sum3Parameters.value += elem[el.substring(7).trim()].commandPercent;
                }
            } else {
                if (elem[el].value != 0) {
                    elem.sum3Parameters.value += elem[el].value;
                } else {
                    elem.sum3Parameters.value += elem[el].percent;
                }
            }
        });    
    }

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
            if (type.includes('pvp')) {
                res.damage.percent += 10;
                res.generalProtection.value += 10;    
            }
            /* res.damage.percent += 10;
            res.generalProtection.value += 10; */
            res.hp.value += 130;
            res.damage.value += 10;
            res.hp.commandValue += 30;            
        }
            
        res.countSomeParameters();

        return res;
    };
         
    let countAllValues;    
    let countProgress = 1; 
    let currentProgress = 0;   
            
    const allRingsNums = [];
    const allSpearsNums = [];
    data.forEach((el, ind, arr) => {                
        arr[ind]['num'] = ind;
        switch (arr[ind].type) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 6:
            case 7:
            case 8:
            case 9:
                all[arr[ind].type - 1].push(el);
                break;
            case 5:
                allRingsNums.push(arr[ind].num);
                break;
            case 10:
                allSpearsNums.push(arr[ind].num);
                break;
        }
        
    });       

    for (let i1 = 0; i1 < allRingsNums.length - 1; i1++) {
        for (let i2 = i1 + 1; i2 < allRingsNums.length; i2++) {
            all[4].push(new Array(new Etalon(), data[allRingsNums[i1]], data[allRingsNums[i2]]));
        }
    }

    for (let i1 = 0; i1 < allRingsNums.length - 1; i1++) {
        for (let i2 = i1 + 1; i2 < allRingsNums.length; i2++) {
            for (let i3 = 0; i3 < allSpearsNums.length; i3++) {
                all[9].push(new Array(new Etalon(), data[allRingsNums[i1]], data[allRingsNums[i2]], data[allSpearsNums[i3]]));
            }
        }
    }
   
    const allProps = new Etalon();    

    Object.keys(allProps).forEach(prop => {
        
        all.forEach(arr => {
            arr.forEach(obj => {   
                if (obj instanceof Array) {                    
                    obj.forEach((el, ind) => {
                        if (ind > 0) {
                            el[prop]['rating'] = el[prop].value + ((el[prop].percent) ? el[prop].percent / 3 : 0);
                            
                            el[prop]['commandrating'] = el[prop].commandValue + ((el[prop].commandPercent) ? el[prop].commandPercent / 3 : 0);
                        } else {
                            el[prop]['rating'] = 0;
                            el[prop]['commandrating'] = 0;
                        }
                    });  

                } else if (obj instanceof Object) {
                    obj[prop]['rating'] = obj[prop].value + ((obj[prop].percent) ? obj[prop].percent / 3 : 0);
                    obj[prop]['commandrating'] = obj[prop].commandValue + ((obj[prop].commandPercent) ? obj[prop].commandPercent / 3 : 0);
                }                
            });
        });
        
    });

    all.forEach(arr => {
        arr.forEach(el => {            
            if (el instanceof Array) {
                let trap = 0;
                let lion = 0;
                el.forEach((item, index, array) => {
                    if (index != 0) {

                        trap = (item.complect == 2) ? ++trap : trap;
                        lion = (item.complect == 3) ? ++lion : lion;                        

                        Object.keys(item).forEach(prop => {     
                            if (typeof item[prop] == 'object') {
                                array[0][prop]['rating'] += item[prop]['rating'];
                                array[0][prop]['commandrating'] += item[prop]['commandrating'];
                            }                            
                        });
                    }
                });

                if (trap >= 3) {                    
                    el[0].damage.rating += 4.2;
                    el[0].accuracy.rating += 2;                                        
                    el[0].damage.commandrating += 1.2;
                }
                if (lion >= 3) {                                      
                    if (type.includes('pvp')) {
                        el[0].damage.rating += 13;
                        el[0].generalProtection.rating += 10;    
                    } else {
                        el[0].damage.rating += 10;
                    }
                    /* el[0].damage.rating += 13;
                    el[0].generalProtection.rating += 10; */
                    el[0].hp.rating += 130;                    
                    el[0].hp.commandrating += 30;
                }
                el[0].allDamage['rating'] = Object.keys(el[0]).filter(prop => el[0][prop].calculate === 1).reduce((res, current) => res + el[0][current].rating, 0);

                el[0].sum3Parameters['rating'] = el[0]['allDamage']['rating'] + el[0]['generalProtection']['rating'] + el[0]['shock']['rating'];

                el[0].allParameters['rating'] = Object.keys(el[0]).filter(prop => el[0][prop].calculate === 2).reduce((res, current) => res + el[0][current].rating, 0);
            } else if (el instanceof Object) {
                el.allDamage['rating'] = Object.keys(el).filter(prop => el[prop].calculate === 1).reduce((res, current) => res + el[current].rating, 0);

                el.sum3Parameters['rating'] = el['allDamage']['rating'] + el['generalProtection']['rating'] + el['shock']['rating'];

                el.allParameters['rating'] = Object.keys(el).filter(prop => el[prop].calculate === 2).reduce((res, current) => res + el[current].rating, 0);
            }
        });            
    });
    
    let logical, logicalArray, elements;
    
    if (funcName == 'find_all_variants' || funcName == 'top_values') {

        switch (funcName) {
            case 'find_all_variants':
                logical = forms.reduce((begin, current) => begin + `b.${current.name}.${current.command ? 'commandrating' : 'rating'} + `, '').slice(0, -2) + ' - ' + forms.reduce((begin, current) => begin + `a.${current.name}.${current.command ? 'commandrating' : 'rating'} + `, '').slice(0, -2);

                logicalArray = forms.reduce((begin, current) => begin + `b[0].${current.name}.${current.command ? 'commandrating' : 'rating'} + `, '').slice(0, -2) + ' - ' + forms.reduce((begin, current) => begin + `a[0].${current.name}.${current.command ? 'commandrating' : 'rating'} + `, '').slice(0, -2);    
                break;
            case 'top_values':
                
                logical = dataFields.reduce((begin, current) => begin + `b.${(current.includes('command') ? current.substring(7).trim() : current)}.${(current.includes('command') ? 'commandrating' : 'rating')} + `, '').slice(0, -2) + ' - ' + dataFields.reduce((begin, current) => begin + `a.${(current.includes('command') ? current.substring(7).trim() : current)}.${(current.includes('command') ? 'commandrating' : 'rating')} + `, '').slice(0, -2);                    

                logicalArray = dataFields.reduce((begin, current) => begin + `b[0].${(current.includes('command') ? current.substring(7).trim() : current)}.${(current.includes('command') ? 'commandrating' : 'rating')} + `, '').slice(0, -2) + ' - ' + dataFields.reduce((begin, current) => begin + `a[0].${(current.includes('command') ? current.substring(7).trim() : current)}.${(current.includes('command') ? 'commandrating' : 'rating')} + `, '').slice(0, -2);                    

                break;
        }        

        all.forEach(el => {                
            if (el[0] instanceof Array) {
                el.sort((a, b) => eval(logicalArray));
            } else if (el[0] instanceof Object) {
                el.sort((a, b) => eval(logical));
            }                        
        });

        elements = [[], [], [], [], [], [], [], [], [], []];        
    }


    const countMultipleSwords = (val, arr) => {
        return arr.filter((el, ind) => ind != 4).reduce((iter, el) => iter * el.length, val);
    }
    const countMultipleSpears = (val, arr) => {
        return arr.filter((el, ind) => ind != 1 && ind != 4 && ind != 8).reduce((iter, el) => iter * el.length, val);
    }

    switch (funcName) {
        case 'count_max_values':
            const names = ['rating', 'commandrating'];            
            Object.keys(rezArray).forEach(prop => {

                for (let count = 0; count <= 1; count++) {
                    all.forEach(el => {                    
                        if (el[0] instanceof Array) {
                            el.sort((a, b) => b[0][prop][`${names[count]}`] - a[0][prop][`${names[count]}`]);
                        } else if (el[0] instanceof Object) {
                            el.sort((a, b) => b[prop][`${names[count]}`] - a[prop][`${names[count]}`]);
                        }                        
                    });                    
                                        
                    if (filter == 'swords' || filter == 'all') {
                        findMaxValues(countVal([all[0][0], all[1][0], all[2][0], all[3][0], ...all[4][0], all[5][0], all[6][0], all[7][0], all[8][0]]), rezArray);  
                    }
                    if (filter == 'spears' || filter == 'all') {                    
                        findMaxValues(countVal([all[0][0], all[2][0], all[3][0], all[5][0], all[6][0], all[8][0], ...all[9][0]]), rezArray);
                    }
                }
            });
            break;
        case 'find_all_variants':
                        
            if (filter == 'swords' || filter == 'all') {                    
 
                all.forEach((el, ind) => {
                    el.forEach((obj, index) => {                        
                        if (ind == 4) {
                            elements[4][index] = obj[1];
                            elements[5][index] = obj[2];                            
                        } else if (ind > 4 && ind!= 9) {
                            elements[ind + 1][index] = obj;
                        } else if (ind < 4) {
                            elements[ind][index] = obj;
                        }
                    })                     
                });    

                countAllValues = countMultipleSwords(1, elements);
                const val1Percent = Math.trunc(countAllValues / 100);                

                for (let i1 = 0; i1 < elements[0].length; i1++) {
                for (let i2 = 0; i2 < elements[1].length; i2++) {
                for (let i3 = 0; i3 < elements[2].length; i3++) {
                for (let i4 = 0; i4 < elements[3].length; i4++) {
                for (let i5 = 0; i5 < elements[4].length; i5++) {
                for (let i7 = 0; i7 < elements[6].length; i7++) {
                for (let i8 = 0; i8 < elements[7].length; i8++) {
                for (let i9 = 0; i9 < elements[8].length; i9++) {
                for (let i10 = 0; i10 < elements[9].length; i10++) {
                    

                    if (++currentProgress == val1Percent) {
                        currentProgress = 0;
                        postMessage(++countProgress);
                    }

                    let result = countVal([elements[0][i1], elements[1][i2], elements[2][i3],elements[3][i4],elements[4][i5],elements[5][i5],elements[6][i7],elements[7][i8],elements[8][i9],elements[9][i10]]);

                    if (checkForms(result, forms)) {
                        postMessage(result);                                                
                    }
                }}}}}}}}}
            }            
            if (filter == 'spears' || filter == 'all') {                                     

                all.forEach((el, ind) => {
                    el.forEach((obj, index) => {                        
                        if (ind >=0 && ind <= 3 && ind != 1) {
                            elements[ind][index] = obj;
                        } else if (ind > 4 && ind < 9 && ind != 7) {
                            elements[ind + 1][index] = obj;
                        } else if (ind == 9) {
                            elements[4][index] = obj[1];
                            elements[5][index] = obj[2];
                            elements[1][index] = obj[3];
                        }
                    })                     
                });        

                countAllValues = countMultipleSpears(1, elements);
                const val1Percent = Math.trunc(countAllValues / 100);                

                for (let i1 = 0; i1 < elements[0].length; i1++) {                
                for (let i3 = 0; i3 < elements[2].length; i3++) {
                for (let i4 = 0; i4 < elements[3].length; i4++) {
                for (let i5 = 0; i5 < elements[4].length; i5++) {
                for (let i7 = 0; i7 < elements[6].length; i7++) {                
                for (let i8 = 0; i8 < elements[7].length; i8++) {
                for (let i9 = 0; i9 < elements[9].length; i9++) {
                    

                    if (++currentProgress == val1Percent) {
                        currentProgress = 0;
                        postMessage(++countProgress);
                    }

                    let result = countVal([elements[0][i1], elements[1][i5], elements[2][i3],elements[3][i4],elements[4][i5],elements[5][i5],elements[6][i7],elements[7][i8],elements[9][i9]]);

                    if (checkForms(result, forms)) {                        
                        postMessage(result);                        
                    }                        
                }}}}}}}                                
            }            
            break;
        case 'top_values':            
            if (filter == 'swords') {
                            
                let workArray = [[], [], [], [], [], [], [], [], []];
                let itemSort = [];
                
                all.forEach((el, ind) => {
                    if (ind != 4 && ind != 9) {
                        all[ind].sort((a, b) => {
                            if (a.sum3Parameters.rating < b.sum3Parameters.rating) {
                                return 1;
                            }
                            if (a.sum3Parameters.rating > b.sum3Parameters.rating) {
                                return -1;
                            }                      
                            return 0;
                        });
                    } else {
                        all[ind].sort((a, b) => {
                            if (a[0].sum3Parameters.rating < b[0].sum3Parameters.rating) {
                                return 1;
                            }
                            if (a[0].sum3Parameters.rating > b[0].sum3Parameters.rating) {
                                return -1;
                            }                      
                            return 0;
                        });
                    }
                });

                all.forEach((el, ind) => {
                    if (ind != 9) {
                        el.forEach((element, index) => {
                            if (!index) {
                                if (ind != 4) {
                                    workArray[ind].push(element.num)    
                                } else {
                                    workArray[4].push(`${element[1].num}, ${element[2].num}`);
                                }
                            } else {
                                if (ind != 4) {
                                    if (index < 2) {
                                        workArray[ind].push(element.num);
                                    } else {
                                        itemSort.push(element);    
                                    }                                    
                                } else {        
                                    workArray[4].push(`${element[1].num}, ${element[2].num}`);
                                }
                            }
                        })    
                    }                    
                });
                itemSort.sort((a, b) => {
                    if (a.sum3Parameters.rating < b.sum3Parameters.rating) {
                        return 1;
                    }
                    if (a.sum3Parameters.rating > b.sum3Parameters.rating) {
                        return -1;
                    }                      
                    return 0;
                });
                
                let currentAddedElement = -1;

                const countProgress = 0;                
                
                do {
                    topRezult.length = 0;
                    for (let i1 = 0; i1 < workArray[0].length; i1++) {
                    for (let i2 = 0; i2 < workArray[1].length; i2++) {
                    for (let i3 = 0; i3 < workArray[2].length; i3++) {
                    for (let i4 = 0; i4 < workArray[3].length; i4++) {
                    for (let i5 = 0; i5 < workArray[4].length; i5++) {
                    for (let i6 = 0; i6 < workArray[5].length; i6++) {
                    for (let i7 = 0; i7 < workArray[6].length; i7++) {
                    for (let i8 = 0; i8 < workArray[7].length; i8++) {
                    for (let i9 = 0; i9 < workArray[8].length; i9++) {
                                                
                        const ring1 = Number((workArray[4][i5].split(','))[0]);
                        const ring2 = Number((workArray[4][i5].split(','))[1]);

                        let result = countVal([data[workArray[0][i1]], data[workArray[1][i2]], data[workArray[2][i3]], data[workArray[3][i4]], data[ring1], data[ring2], data[workArray[5][i6]], data[workArray[6][i7]], data[workArray[7][i8]], data[workArray[8][i9]]]);
                        result.sum3Parameters.value = 0;
                        countAllTop(result);

                        if (checkControlDataForms.includes('yes') && checkForms(result, forms)) {
                            topRezult.push(result);
                        } else if (checkControlDataForms.includes('no')) {
                            topRezult.push(result);
                        }
                    }}}}}}}}}

                    topRezult.sort((a, b) => {
                        if (a.sum3Parameters.value < b.sum3Parameters.value) {
                            return 1;
                        }
                        if (a.sum3Parameters.value > b.sum3Parameters.value) {
                            return -1;
                        }                      
                        return 0;
                    })
                    if (typeof itemSort[++currentAddedElement].num == 'string') {
                        workArray[4].push(itemSort[currentAddedElement].num);
                    } else {
                        workArray[itemSort[currentAddedElement].type - 1].push(itemSort[currentAddedElement].num);
                    }

                    if (topRezult.length > topCount) {
                        topRezult.length = topCount;    
                    }                 
                    postMessage(Math.trunc(topRezult.length * 100 / topCount)); 
                    
                } while (topRezult.length < topCount && currentAddedElement < itemSort.length);

            }

            if (filter == 'spears') {
        
                let workArray = [[], [], [], [], [], [], [], [], []];
                let itemSort = [];
                
                all.forEach((el, ind) => {
                    if (ind != 4 && ind != 9) {
                        all[ind].sort((a, b) => {
                            if (a.sum3Parameters.rating < b.sum3Parameters.rating) {
                                return 1;
                            }
                            if (a.sum3Parameters.rating > b.sum3Parameters.rating) {
                                return -1;
                            }                      
                            return 0;
                        });
                    } else if (ind == 9){
                        all[ind].sort((a, b) => {
                            if (a[0].sum3Parameters.rating < b[0].sum3Parameters.rating) {
                                return 1;
                            }
                            if (a[0].sum3Parameters.rating > b[0].sum3Parameters.rating) {
                                return -1;
                            }                      
                            return 0;
                        });
                    }
                });
                         
                all.forEach((el, ind) => {
                    if (ind != 4 && ind != 1 && ind != 7) {
                        el.forEach((element, index) => {
                            if (!index) {
                                if (ind != 9) {
                                    workArray[ind].push(element.num);
                                } else {
                                    workArray[4].push(`${element[1].num}, ${element[2].num}, ${element[3].num}`);
                                }
                            } else {
                                if (ind != 9) {
                                    if (index < 2) {
                                        workArray[ind].push(element.num);
                                    } else {
                                        itemSort.push(element);    
                                    }                                    
                                } else {       
                                    workArray[4].push(`${element[1].num}, ${element[2].num}, ${element[3].num}`);                                    
                                }
                            }
                        })    
                    }                    
                });
                itemSort.sort((a, b) => {
                    if (a.sum3Parameters.rating < b.sum3Parameters.rating) {
                        return 1;
                    }
                    if (a.sum3Parameters.rating > b.sum3Parameters.rating) {
                        return -1;
                    }                      
                    return 0;
                });
                
                let currentAddedElement = -1;
                const countProgress = 0;                    

                do {
                    topRezult.length = 0;
                    for (let i1 = 0; i1 < workArray[0].length; i1++) {                    
                    for (let i3 = 0; i3 < workArray[2].length; i3++) {
                    for (let i4 = 0; i4 < workArray[3].length; i4++) {                    
                    for (let i6 = 0; i6 < workArray[5].length; i6++) {
                    for (let i7 = 0; i7 < workArray[6].length; i7++) {                    
                    for (let i9 = 0; i9 < workArray[8].length; i9++) {
                    for (let i10 = 0; i10 < workArray[4].length; i10++) {
                        
                        const ring1 = Number((workArray[4][i10].split(','))[0]);
                        const ring2 = Number((workArray[4][i10].split(','))[1]);
                        const spear = Number((workArray[4][i10].split(','))[2]);

                        let result = countVal([data[workArray[0][i1]], data[workArray[2][i3]], data[workArray[3][i4]], data[ring1], data[ring2], data[workArray[5][i6]], data[workArray[6][i7]], data[workArray[8][i9]], data[spear]]);
                        result.sum3Parameters.value = 0;
                        countAllTop(result);

                        if (checkControlDataForms.includes('yes') && checkForms(result, forms)) {
                            topRezult.push(result);
                        } else if (checkControlDataForms.includes('no')) {
                            topRezult.push(result);
                        }
                    }}}}}}}                   

                    topRezult.sort((a, b) => {
                        if (a.sum3Parameters.value < b.sum3Parameters.value) {
                            return 1;
                        }
                        if (a.sum3Parameters.value > b.sum3Parameters.value) {
                            return -1;
                        }                      
                        return 0;
                    })

                    if (typeof itemSort[++currentAddedElement].num == 'string') {
                        workArray[4].push(itemSort[currentAddedElement].num);
                    } else {
                        workArray[itemSort[currentAddedElement].type - 1].push(itemSort[currentAddedElement].num);
                    }                                                          

                    postMessage(Math.trunc(topRezult.length * 100 / topCount));

                } while (topRezult.length < topCount && currentAddedElement < itemSort.length);

                if (topRezult.length > topCount) {
                    topRezult.length = topCount;    
                }
            }            

            if (filter == 'all') {                

                let workArray = [[], [], [], [], [], [], [], [], []];//Тут макс элементы
                let itemSort = [];
                
                all.forEach((el, ind) => {
                    if (ind != 4 && ind != 9) {
                        all[ind].sort((a, b) => {
                            if (a.sum3Parameters.rating < b.sum3Parameters.rating) {
                                return 1;
                            }
                            if (a.sum3Parameters.rating > b.sum3Parameters.rating) {
                                return -1;
                            }                      
                            return 0;
                        });
                    } else {
                        all[ind].sort((a, b) => {
                            if (a[0].sum3Parameters.rating < b[0].sum3Parameters.rating) {
                                return 1;
                            }
                            if (a[0].sum3Parameters.rating > b[0].sum3Parameters.rating) {
                                return -1;
                            }                      
                            return 0;
                        });
                    }
                });
                
                all.forEach((el, ind) => {
                    if (ind != 9) {
                        el.forEach((element, index) => {
                            if (!index) {
                                if (ind != 4) {
                                    workArray[ind].push(element.num)    
                                } else {
                                    workArray[4].push(`${element[1].num}, ${element[2].num}`);
                                }
                            } else {
                                if (ind != 4) {
                                    if (index < 2) {
                                        workArray[ind].push(element.num);
                                    } else {
                                        itemSort.push(element);    
                                    }                                    
                                } else {        
                                    workArray[4].push(`${element[1].num}, ${element[2].num}`);
                                }
                            }
                        })    
                    }                    
                });
                itemSort.sort((a, b) => {
                    if (a.sum3Parameters.rating < b.sum3Parameters.rating) {
                        return 1;
                    }
                    if (a.sum3Parameters.rating > b.sum3Parameters.rating) {
                        return -1;
                    }                      
                    return 0;
                });

                let workArray2 = [[], [], [], [], [], [], [], [], []];
                let itemSort2 = [];

                all.forEach((el, ind) => {
                    if (ind != 4 && ind != 1 && ind != 7) {
                        el.forEach((element, index) => {
                            if (!index) {
                                if (ind != 9) {
                                    workArray2[ind].push(element.num);
                                } else {
                                    workArray2[4].push(`${element[1].num}, ${element[2].num}, ${element[3].num}`);
                                }
                            } else {
                                if (ind != 9) {
                                    if (index < 2) {
                                        workArray2[ind].push(element.num);
                                    } else {
                                        itemSort2.push(element);    
                                    }                                    
                                } else {       
                                    workArray2[4].push(`${element[1].num}, ${element[2].num}, ${element[3].num}`);                                    
                                }
                            }
                        })    
                    }                    
                });
                itemSort2.sort((a, b) => {
                    if (a.sum3Parameters.rating < b.sum3Parameters.rating) {
                        return 1;
                    }
                    if (a.sum3Parameters.rating > b.sum3Parameters.rating) {
                        return -1;
                    }                      
                    return 0;
                });
                
                let currentAddedElement = -1;
                const countProgress = 0;                    
                
                do {
                    topRezult.length = 0;
                    for (let i1 = 0; i1 < workArray[0].length; i1++) {
                    for (let i2 = 0; i2 < workArray[1].length; i2++) {
                    for (let i3 = 0; i3 < workArray[2].length; i3++) {
                    for (let i4 = 0; i4 < workArray[3].length; i4++) {
                    for (let i5 = 0; i5 < workArray[4].length; i5++) {
                    for (let i6 = 0; i6 < workArray[5].length; i6++) {
                    for (let i7 = 0; i7 < workArray[6].length; i7++) {
                    for (let i8 = 0; i8 < workArray[7].length; i8++) {
                    for (let i9 = 0; i9 < workArray[8].length; i9++) {
                        
                        const ring1 = Number((workArray[4][i5].split(','))[0]);
                        const ring2 = Number((workArray[4][i5].split(','))[1]);

                        let result = countVal([data[workArray[0][i1]], data[workArray[1][i2]], data[workArray[2][i3]], data[workArray[3][i4]], data[ring1], data[ring2], data[workArray[5][i6]], data[workArray[6][i7]], data[workArray[7][i8]], data[workArray[8][i9]]]);
                        result.sum3Parameters.value = 0;
                        countAllTop(result);

                        if (checkControlDataForms.includes('yes') && checkForms(result, forms)) {
                            topRezult.push(result);
                        } else if (checkControlDataForms.includes('no')) {
                            topRezult.push(result);
                        }
                    }}}}}}}}}

                    for (let i1 = 0; i1 < workArray2[0].length; i1++) {                    
                        for (let i3 = 0; i3 < workArray2[2].length; i3++) {
                        for (let i4 = 0; i4 < workArray2[3].length; i4++) {                    
                        for (let i6 = 0; i6 < workArray2[5].length; i6++) {
                        for (let i7 = 0; i7 < workArray2[6].length; i7++) {                    
                        for (let i9 = 0; i9 < workArray2[8].length; i9++) {
                        for (let i10 = 0; i10 < workArray2[4].length; i10++) {
                            
                            const ring1 = Number((workArray2[4][i10].split(','))[0]);
                            const ring2 = Number((workArray2[4][i10].split(','))[1]);
                            const spear = Number((workArray2[4][i10].split(','))[2]);
    
                            let result = countVal([data[workArray2[0][i1]], data[workArray2[2][i3]], data[workArray2[3][i4]], data[ring1], data[ring2], data[workArray2[5][i6]], data[workArray2[6][i7]], data[workArray2[8][i9]], data[spear]]);
                            result.sum3Parameters.value = 0;
                            countAllTop(result);
    
                            if (checkControlDataForms.includes('yes') && checkForms(result, forms)) {
                                topRezult.push(result);
                            } else if (checkControlDataForms.includes('no')) {
                                topRezult.push(result);
                            }
                    }}}}}}}

                    topRezult.sort((a, b) => {
                        if (a.sum3Parameters.value < b.sum3Parameters.value) {
                            return 1;
                        }
                        if (a.sum3Parameters.value > b.sum3Parameters.value) {
                            return -1;
                        }                      
                        return 0;
                    })
                    if (typeof itemSort[++currentAddedElement].num == 'string') {
                        workArray[4].push(itemSort[currentAddedElement].num);
                    } else {
                        workArray[itemSort[currentAddedElement].type - 1].push(itemSort[currentAddedElement].num);
                    }

                    
                    if (typeof itemSort2[currentAddedElement].num == 'string') {
                        workArray2[4].push(itemSort2[currentAddedElement].num);
                    } else {
                        workArray2[itemSort2[currentAddedElement].type - 1].push(itemSort2[currentAddedElement].num);
                    } 

                    if (topRezult.length > topCount) {
                        topRezult.length = topCount;    
                    }                    
                    
                    postMessage(Math.trunc(topRezult.length * 100 / topCount));

                } while (topRezult.length < topCount && currentAddedElement < itemSort.length && currentAddedElement < itemSort2.length);
            }            
            break;            
    }

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