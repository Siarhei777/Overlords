//Модуль для очистки всех input - Все ОК!
export default () => {
    if (document.getElementById('accept').getAttribute('data-func') != 'clearAll') return;       
    document.querySelectorAll('.control-data__input input').forEach(el => {
        el.value = '0';
        el.classList.remove('reject');
    });
}

