//Для сокрытия вещей, надетых в подобранный комплект:
export default (nums) => {
    document.querySelectorAll('#all-items>div').forEach(el => el.style.display = 'block');
    document.querySelectorAll('#all-items>div').forEach((el, ind) => {
        if (nums.indexOf(ind) != -1) el.style.display = 'none';
    });
}