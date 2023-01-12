/**********************************************/
/*Transform data into a more usable structure.*/
/**********************************************/
import Etalon from './init_data';

export default (data) => {
    const result = new Etalon();
            
    result.type = data.type;
    result.complect = data.complect;

    Object.keys(result).forEach(prop => {
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
    });

    return result;   
}