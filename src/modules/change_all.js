//Для сокрытия вещей, надетых в подобранный комплект:
export default (nums) => {
    console.log(nums);
    document.querySelectorAll('.all__items-container>div').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.all__items-container>div').forEach((el, ind) => {
        if (nums.indexOf(ind) != -1) {            
            el.style.display = 'none';
        }    
        else {
            el.style.display = 'inline-block';    
        }        
    });
    document.querySelector('.all__items-container').style.left = '0px';
    document.getElementById('decrease2').classList.add('disabled');
    document.getElementById('increase2').classList.add('disabled');
    document.getElementById('item-now2').innerHTML = '1';
    document.getElementById('item-all2').innerHTML = Math.ceil(document.querySelectorAll('.all__items-container>div').length / 12);
    if (Math.ceil(document.querySelectorAll('.all__items-container>div').length / 12) > 1) {
        document.getElementById('increase2').classList.remove('disabled');
    }
    document.querySelector('.all__items-container').style.width = `${100 * +document.getElementById('item-all2').innerHTM}%`;
    document.querySelector('.all__items-container').style.gridTtemplateColumns = `repeat(${100 * Math.ceil(document.querySelectorAll('.all__items-container>div').length / 12)}, 1fr 1fr)`;
}