const initAll = (data) => {
    const all = [[], [], [], [], [], [], [], [], [], []];
    data.forEach((el, ind, arr) => {                
        arr[ind].num = ind;
        all[arr[ind].type - 1].push(ind);
    });       
    return all;
}

const countVariants = (all, type) => {
    
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

    switch (type) {
        case 'swords':
            return countMultiple(countValFuctorial(all[4].length - 1, all[4].length - 2), all[0].length, all[1].length, all[2].length, all[3].length, all[5].length, all[6].length, all[7].length, all[8].length);            
        case 'spears':
            return countMultiple(countValFuctorial(all[4].length - 1, all[4].length - 2), all[0].length, all[2].length, all[3].length, all[5].length, all[6].length, all[8].length, all[9].length);
        case 'all':
            return (countMultiple(countValFuctorial(all[4].length - 1, all[4].length - 2), all[0].length, all[1].length, all[2].length, all[3].length, all[5].length, all[6].length, all[7].length, all[8].length) + countMultiple(countValFuctorial(all[4].length - 1, all[4].length - 2), all[0].length, all[2].length, all[3].length, all[5].length, all[6].length, all[8].length, all[9].length));
    }   
}

const initInfoElements = (arr) => {
    const formatNumber = (num) => String(num).split('').reverse().map((el, ind, arr) => 
        ((ind + 1) % 3 == 0) ? ' ' + el : el).reverse().join('');

    ['all-sets', 'swords-sets', 'spears-sets'].forEach(el => document.getElementById(el).innerHTML = formatNumber(countVariants(arr, el.split('-')[0])));
}

export {initAll, countVariants, initInfoElements}