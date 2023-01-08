import modifyParameters from './modify_parameters';
import etalon from './init_data';

export default (data) => {    
    const all = [];
    const allGroup = [[], [], [], [], [], [], [], [], [], []];    

    const countVal = (arr) => {
        let res = JSON.parse(JSON.stringify(etalon));
        res.num = [];

        let countTrapItems = 0, countLionItems = 0;

        arr.forEach((el, ind) => {
            if (el.complect == 2) {
                ++countTrapItems;
            }
            if (el.complect == 3) {
                ++countLionItems;
            }

            for (let prop in el) {
                if (typeof el[prop] == 'object' && prop in res) {                    
                    res[prop].value += el[prop].value;
                    res[prop].percent += el[prop].percent;
                    res[prop].commandValue += el[prop].commandValue;
                    res[prop].commandPercent += el[prop].commandPercent;                    
                } else if (prop === 'num') {
                    res.num.push(el.num);
                }
            }            
        });

        if (countTrapItems == 3) {        
            res.damage.value += 3;
            res.accuracy.value += 2;
            res.damage.percent += 3;
            res.damage.commandPercent += 3;
        }
        if (countLionItems == 3) {        
            res.damage.percent += 10;
            res.generalProtection.value += 10;
            res.hp.value += 130;
            res.damage.value += 10;
            res.hp.commandvalue += 30;
        }
            
        for (let prop in res) {            
            if (res[prop].value > 0 && res[prop].percent > 0) {
                res[prop].value += Math.ceil((res[prop].value * res[prop].percent) / 100);
            }
        }
        
        res.allDamage.value = res.damage.value + res.damagePhisical.value + res.damagePoison.value + res.damageElectricity.value + res.damageWater.value + res.damageFair.value + res.damageDead.value + res.damageAstral.value;

        return res;
    };
     
    data.forEach((el, ind) => {
        const rez = modifyParameters(el, etalon);        
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

    return all;
}