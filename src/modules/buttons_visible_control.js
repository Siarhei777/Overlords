export default (but1, but2, but3) => {
    setInterval(() => {
        //Для проверки инпутов:
        const checkButton1 = Array.from(document.querySelectorAll(`#pers-data input, #command-data input`)).filter(el => el.value && el.value != '0').length;
        const checkButton2 = document.querySelectorAll('#count-parameters .main > p, #count-parameters .command > p').length;

        if (checkButton1) {
            but1.classList.remove('disabled');
        } else {
            but1.classList.add('disabled');
        }
        if (checkButton2) {
            but2.classList.remove('disabled');
        } else {
            but2.classList.add('disabled');
        }
        if (checkButton1 || checkButton2) {
            but3.classList.remove('disabled');
        } else {
            but3.classList.add('disabled');
        }
        
    }, 100);
}