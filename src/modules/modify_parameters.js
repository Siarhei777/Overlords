//Модуль для преобразования исходного обьекта вещи в объект, удобный для подсчетов:
export default (data, etalon) => {
    const result = JSON.parse(JSON.stringify(etalon));
            
    result.type = data.type;
    result.complect = data.complect;

    for (let prop in result) {
        if (prop in data) {
            if (data[prop].value != 0 && typeof data[prop].value === 'number') {
                result[prop].value = data[prop].value;
            }
            if (parseInt(data[prop].value) != 0 && typeof data[prop].value === 'string') {
                result[prop].percent = parseInt(data[prop].value);
            }
            if (data[prop].commandValue != 0 && typeof data[prop].commandValue === 'number') {
                result[prop].value += data[prop].commandValue;
                result[prop].commandValue = data[prop].commandValue;
            }
            if (parseInt(data[prop].commandValue) != 0 && typeof data[prop].commandValue === 'string') {
                result[prop].percent += parseInt(data[prop].commandValue);
                result[prop].commandPercent = parseInt(data[prop].commandValue);
            }   
        }             
    }

    return result;   
}