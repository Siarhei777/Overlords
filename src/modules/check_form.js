/*******************************************************************/
/* Validation of all input values before generating suitable sets. */
/*******************************************************************/

export default (selector) => {
    let check = true;
    const controlButton = document.getElementById('accept');

    document.querySelectorAll(`${selector} input`).forEach(el => {

        el.classList.remove('access', 'reject');        

        if (Number(el.value) >= 0 && Number(el.value) <= 1000) {
            el.classList.add('access');
        } else {
            check = false;
            el.classList.add('reject');
            controlButton.setAttribute('data-func', '');
        }

    });

    return check;
};