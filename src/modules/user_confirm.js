/************************************************************/
/* Displaying a modal window with information for the user. */
/************************************************************/
export default (text, func) => {    
    const acceptButton = document.getElementById('accept');    

    acceptButton.style.display = (!func) ? 'none' : 'block';
    acceptButton.setAttribute('data-func',func);
    
    document.getElementById('control-info-message').textContent = text;    
}