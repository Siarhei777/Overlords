export default () => {    
    document.querySelector('.all__items-container').style.width = `${+document.getElementById('item-all2').innerHTML * 100}%`;
    document.querySelector('.all__items-container').style.gridTtemplateColumns = `repeat(${100 * Math.ceil(document.querySelectorAll('.all__items-container>div').length / 12)}, 1fr 1fr)`;
    if ((document.getElementById('item-now2').innerHTML === '1' && event.currentTarget.id === 'decrease2') || (+document.getElementById('item-now2').innerHTML == Math.ceil(document.querySelectorAll('.all__items-container>div').length / 12) && event.currentTarget.id === 'increase2')) return;    

    document.getElementById('increase2').classList.remove('disabled');
    document.getElementById('decrease2').classList.remove('disabled');

    switch (event.currentTarget.id) {
        case 'decrease2':
            document.getElementById('item-now2').innerHTML = +document.getElementById('item-now2').innerHTML - 1;
            break;
        case 'increase2':
            document.getElementById('item-now2').innerHTML = +document.getElementById('item-now2').innerHTML + 1;
            break;
    }

    document.querySelector('.all__items-container').style.left = `-${(+document.getElementById('item-now2').innerHTML - 1 ) * 100}%`;

    if (document.getElementById('item-now2').innerHTML === '1') {
        document.getElementById('decrease2').classList.add('disabled');
    }
    if (document.getElementById('item-now2').innerHTML == Math.ceil(document.querySelectorAll('.all__items-container>div').length / 12)) {
        document.getElementById('increase2').classList.add('disabled');
    }

}