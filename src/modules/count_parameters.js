export default (data, currentData, type) => {
    let countTrapItems = 0, countLionItems = 0;    

    data.forEach(el => {

        if ((el.now && type) || (!type)) {
            countTrapItems = (el.complect == 2) ? ++countTrapItems : countTrapItems;
            countLionItems = (el.complect == 3) ? ++countLionItems : countLionItems;
        }    

        for (const prop in el) {
            if ((prop in currentData && el.now && type) || (prop in currentData && !type)) {
                if (el[prop].value) {
                    if (typeof el[prop].value === 'number') {
                        currentData[prop].value += el[prop].value;    
                    } else {
                        currentData[prop].percent += parseInt(el[prop].value);
                    }
                }    
                if (el[prop].commandValue) {
                    if (typeof el[prop].commandValue === 'number') {
                        currentData[prop].value += el[prop].commandValue;
                        currentData[prop].commandValue += el[prop].commandValue;
                    } else {
                        currentData[prop].percent += parseInt(el[prop].commandValue);
                        currentData[prop].commandPercent += parseInt(el[prop].commandValue);
                    }
                }                            
            }
        }
    });

    

    if (countTrapItems >= 3) {        
        currentData.damage.value += 3;
        currentData.accuracy.value += 2;
        currentData.damage.percent += 3;
        currentData.damage.commandPercent += 3;        
    }
    if (countLionItems >= 3) {        
        currentData.damage.percent += 10;
        currentData.generalProtection.value += 10;
        currentData.hp.value += 130;
        currentData.damage.value += 10;
        currentData.hp.commandValue += 30;        
    }
    

    for (let prop in currentData) {
        if (currentData[prop].value && currentData[prop].percent) {        
            currentData[prop].value += Math.ceil((currentData[prop].value * currentData[prop].percent) / 100);
        }
    }
    
    for (let prop in currentData) {
        if (prop.indexOf('amage') == -1 && typeof currentData[prop] == 'object' && prop != 'allParameters' && prop != 'sum3Parameters') {
            if (!currentData[prop].value && currentData[prop].percent) {
                currentData.allParameters.value += currentData[prop].percent;    
            } else if (currentData[prop].value) {
                currentData.allParameters.value += currentData[prop].value;
            }
            
        }
    }

    currentData.allDamage.value = currentData.damage.value + currentData.damagePhisical.value + currentData.damagePoison.value + currentData.damageElectricity.value + currentData.damageWater.value + currentData.damageFair.value + currentData.damageDead.value + currentData.damageAstral.value;

   

    currentData.allParameters.value += currentData.allDamage.value;
    

    currentData.sum3Parameters.value = currentData.allDamage.value + currentData.generalProtection.value + currentData.shock.value;    

    return currentData;
}