//Служит для вывода подсчитанной информации в информационное окно. Все ОК!
export default (idName, par) => {
    
    const createElement = (name, content, classNm) => {
        const newEl = document.createElement(name);
        newEl.innerHTML = content;
        newEl.classList.add(classNm);
        return newEl;
    }

    const el1 = document.querySelector(`#${idName} .main`);
    el1.innerHTML = '';
    const el2 = document.querySelector(`#${idName} .command`);
    el2.innerHTML = '';
    let checkCommand = 0;

    console.log(par);

    if (!par) {
        document.querySelector(`#${idName}`).classList.add('hide');
        return;
    }

    el1.append(createElement('p', 'Повелитель:', 'danger-text'));

    //Для подсчета разницы:
    const countDifference = (elements, name, value, percent) => {
    
        const val = ([...elements].filter(el => el.innerHTML.trim().indexOf(`${name}:`) !== -1).length == 0) ? 0 : (([...elements].filter(el => el.innerHTML.trim().indexOf(`${name}:`) >= 0))[0].innerHTML).slice((([...elements].filter(el => el.innerHTML.trim().indexOf(`${name}:`) >= 0))[0].innerHTML.trim()).indexOf(':') + 1);

        if (value == 0 && percent == 0) {
            if (Number.isNaN(Number(val))) {
                return `<span class="smaller">(-${val})</span>`
            } else if (Number(val) == 0) {
                return '';
            } else if (Number(val) != 0) {
                `<span class="smaller">(-${val})</span>`;
            }            
        } else if (value != 0) {
            if (Number.isNaN(Number(val))) {
                return `<span class="more">(+${value})</span>`;
            } else {
                if (Number(val) === value) {
                    return '';
                } else if (Number(val) > value) {
                    return `<span class="smaller">(${value - Number(val)})</span>`;
                } else {
                    return `<span class="more">(+${value - Number(val)})</span>`;
                }
            }            
        } else if (value == 0 && percent != 0) {
            if (Number.isNaN(Number(val))) {
                if (parseInt(val) === percent) {
                    return '';
                } else if (parseInt(val) > percent) {
                    return `<span class="smaller">(${percent - parseInt(val)}%)</span>`;
                } else if (parseInt(val) < percent) {
                    return `<span class="more">(+${percent - parseInt(val)}%)</span>`;
                }
            } else {
                if (parseInt(val) == 0) {
                    return `<span class="more">(+${percent}%)</span>`;    
                } else if (parseInt(val) > 0) {
                    return `<span class="smaller">(-${parseInt(val)})</span>`;
                }
                
            }            
        }
    }

    //Все текущие значения:
    const currentValues = document.querySelectorAll('#current-parameters .main p.parameters__text');
    const currentCommandValues = document.querySelectorAll('#current-parameters .command p.parameters__text');

    for (const prop in par) {    
        if (!(par[prop] instanceof Array)) {
            el1.append(createElement('p', `${par[prop].name}: ${(par[prop].value || (par[prop].value === 0 && !par[prop].percent)) ? par[prop].value : par[prop].percent + '%'} ${(idName != 'current-parameters') ? countDifference(currentValues, par[prop].name, par[prop].value, par[prop].percent) : ''}`, 'parameters__text'));

            checkCommand = (par[prop].commandValue || par[prop].commandValue) ? ++checkCommand : checkCommand;
        }        
    }

    if (checkCommand) {
        el2.append(createElement('p', 'В т.ч. на команду:', 'danger-text'));
        for (const prop in par) {        
            if (par[prop].commandValue || par[prop].commandPercent) {
                el2.append(createElement('p', `${par[prop].name}: ${(par[prop].commandValue || (par[prop].commandValue === 0 && !par[prop].commandPercent)) ? par[prop].commandValue : par[prop].commandPercent + '%'} ${(idName != 'current-parameters') ? countDifference(currentCommandValues, par[prop].name, par[prop].commandValue, par[prop].commandPercent) : ''}`, 'parameters__text'));
            }            
        }
    }
}