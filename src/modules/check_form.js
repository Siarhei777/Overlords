//Валидация форм перед формированием всех возможных вариантов. import не нужен, входной параметр - идентификатор формы. Все ОК!
export default (selector) => {
    let check = true;
    document.querySelectorAll(`${selector} input`).forEach(el => {
        el.classList.remove('access', 'reject');        
        if (Number(el.value) >= 0 && Number(el.value) <= 1000) {
            el.classList.add('access');
        } else {
            check = false;
            el.classList.add('reject');
            document.getElementById('accept').setAttribute('data-func', '');            
        }
    });
    return check;
};