//По идее все ОК -только снять с акцепта обработчик???!!!
export default (text, func) => {    
    if (!func) {
        document.getElementById('accept').style.display = 'none';
    } else {
        document.getElementById('accept').style.display = 'block';
    }
    document.getElementById('control-info-message').textContent = text;    
    document.getElementById('accept').setAttribute('data-func',func);
}