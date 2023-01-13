/**********************************************************************************************/
/*The module checks the values of all input fields with an interval of 100ms and, if necessary, activates (deactivates) the control buttons*/
/**********************************************************************************************/
export default (but1, but2, but3) => {
    setInterval(() => {
        
        const checkButton1 = Array.from(document.querySelectorAll(`#pers-data input, #command-data input`)).filter(el => el.value && el.value != '0').length;
        const checkButton2 = document.querySelectorAll('#count-parameters .info-block > p').length;
        
        (checkButton1) ? but1.classList.remove('disabled') : but1.classList.add('disabled');
        (checkButton2) ? but2.classList.remove('disabled') : but2.classList.add('disabled');
        (checkButton1 || checkButton2) ? but3.classList.remove('disabled') : but3.classList.add('disabled');
                        
    }, 100);
}