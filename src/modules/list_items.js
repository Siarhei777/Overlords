/***********************************************************************************************/
/* Controls the display management of available items not included in the current matched set. */
/***********************************************************************************************/
export default () => {    
    const container = document.querySelector('.all__items-container');
    const containerElements = document.querySelectorAll('.all__items-container>div');
    const itemNow = document.getElementById('item-now2');    
    const itemAll = document.getElementById('item-all2');    
    const increaseButton = document.getElementById('increase2');
    const decreaseButton = document.getElementById('decrease2');
    const countShowSlide = elements => Math.ceil((Array.from(elements).filter(el => getComputedStyle(el).display === 'block')).length / 12);

    container.style.width = `${countShowSlide(containerElements) * 100}%`;    
    container.style.gridTtemplateColumns = `repeat(${countShowSlide(containerElements)}, 1fr 1fr)`;

    if ((Number(itemNow.innerHTML) === 1 && event.currentTarget.id === 'decrease2') || (Number(itemNow.innerHTML) == countShowSlide(containerElements) && event.currentTarget.id === 'increase2')) return;

    increaseButton.classList.remove('disabled');
    decreaseButton.classList.remove('disabled');

    switch (event.currentTarget.id) {
        case 'decrease2':
            itemNow.innerHTML = Number(itemNow.innerHTML) - 1;
            break;
        case 'increase2':
            itemNow.innerHTML = Number(itemNow.innerHTML) + 1;
            break;
    }

    container.style.left = `-${(Number(itemNow.innerHTML) - 1 ) * 100}%`;

    if (Number(itemNow.innerHTML) === 1) {
        decreaseButton.classList.add('disabled');
    }
    if (Number(itemNow.innerHTML) == countShowSlide(containerElements)) {
        increaseButton.classList.add('disabled');
    }
}