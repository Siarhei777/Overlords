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

const modifyParameters = (data) => {
    const result = new Etalon();
            
    result.type = data.type;
    result.complect = data.complect;

    Object.keys(result).forEach(prop => {
        if (prop in data) {
            if (data[prop].value != 0 && typeof data[prop].value === 'number') {
                result[prop].value = data[prop].value;
            }
            if (parseInt(data[prop].value) != 0 && typeof data[prop].value === 'string') {
                result[prop].percent = parseInt(data[prop].value);
            }
            if (data[prop].commandValue != 0 && typeof data[prop].commandValue === 'number') {
                result[prop].value += data[prop].commandValue;
                result[prop].commandValue = data[prop].commandValue;
            }
            if (parseInt(data[prop].commandValue) != 0 && typeof data[prop].commandValue === 'string') {
                result[prop].percent += parseInt(data[prop].commandValue);
                result[prop].commandPercent = parseInt(data[prop].commandValue);
            }   
        }
    });

    return result;   
}

onmessage = (e) => {    
    const all = [];
    const allGroup = [[], [], [], [], [], [], [], [], [], []];    
    const data = e.data;

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
     
    data.forEach((el, ind) => {
        const rez = modifyParameters(el);
        rez.num = ind;
        allGroup[rez.type - 1].push(rez);
    });    
        
    for (let i1 = 0; i1 < allGroup[0].length; i1++) {
        for (let i2 = 0; i2 < allGroup[1].length; i2++) {
            for (let i3 = 0; i3 < allGroup[2].length; i3++) {
                for (let i4 = 0; i4 < allGroup[3].length; i4++) {
                    for (let i5 = 0; i5 < allGroup[4].length - 1; i5++) {
                        for (let i6 = i5 + 1; i6 < allGroup[4].length; i6++) {
                            for (let i7 = 0; i7 < allGroup[5].length; i7++) {
                                for (let i8 = 0; i8 < allGroup[6].length; i8++) {
                                    for (let i9 = 0; i9 < allGroup[7].length; i9++) {
                                        for (let i10 = 0; i10 < allGroup[8].length; i10++) {
                                            all.push(countVal([allGroup[0][i1],
                                                              allGroup[1][i2],
                                                              allGroup[2][i3],
                                                              allGroup[3][i4],
                                                              allGroup[4][i5],
                                                              allGroup[4][i6],
                                                              allGroup[5][i7],
                                                              allGroup[6][i8],
                                                              allGroup[7][i9],
                                                              allGroup[8][i10]]));
                                        }
                                    }
                                    
                                }
                            }
                        }
                    }
                }
            }
        }                                        
    }    

    for (let i1 = 0; i1 < allGroup[0].length; i1++) {        
        for (let i3 = 0; i3 < allGroup[2].length; i3++) {
            for (let i4 = 0; i4 < allGroup[3].length; i4++) {
                for (let i5 = 0; i5 < allGroup[4].length - 1; i5++) {
                    for (let i6 = i5 + 1; i6 < allGroup[4].length; i6++) {
                        for (let i7 = 0; i7 < allGroup[5].length; i7++) {
                            for (let i8 = 0; i8 < allGroup[6].length; i8++) {      
                                for (let i9 = 0; i9 < allGroup[8].length; i9++) {      
                                    for (let i10 = 0; i10 < allGroup[9].length; i10++) {
                                        all.push(countVal([allGroup[0][i1],
                                                            allGroup[2][i3],
                                                            allGroup[3][i4],
                                                            allGroup[4][i5],
                                                            allGroup[4][i6],
                                                            allGroup[5][i7],
                                                            allGroup[6][i8],
                                                            allGroup[8][i9],
                                                            allGroup[9][i10]]));
                                    }                        
                                }                                                                
                            }
                        }
                    }
                }
            }
        }        
    }

    postMessage(all);
}