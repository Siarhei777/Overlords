/****************************************************************************************/
/*Displaying things that are not included in the selected set in the information window.*/
/****************************************************************************************/
export default (nums) => {
    const elements = document.querySelectorAll('.all__items-container>div');
    const elementsContainer = document.querySelector('.all__items-container');
    elements.forEach((el, ind) => el.style.display = (nums.indexOf(ind) != -1) ? 'none' : 'block');    

    const countShowFields = Math.ceil((Array.from(elements).filter(el => getComputedStyle(el).display == 'block')).length / 12);

    console.log(countShowFields);

    elementsContainer.style.left = '0px';
    document.getElementById('decrease2').classList.add('disabled');
    document.getElementById('increase2').classList.add('disabled');
    document.getElementById('item-now2').innerHTML = '1';
    document.getElementById('item-all2').innerHTML = countShowFields;

    if (countShowFields > 1) {
        document.getElementById('increase2').classList.remove('disabled');
    }

    elementsContainer.style.width = `${100 * countShowFields}%`;
    elementsContainer.style.gridTtemplateColumns = `repeat(${countShowFields}, 1fr 1fr)`;
}