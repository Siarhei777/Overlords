import show from "./create_info_panel";
import showPers from './init_elements';//Для создания человека со шмотками - все ОК!
import changeAll from "./change_all";

//Для сброса всех комплектов
export default () => {
    if (document.getElementById('accept').getAttribute('data-func') != 'clearComplect') return;   

    document.getElementById('item-now').innerHTML = 0;
    document.getElementById('item-all').innerHTML = 0;
    document.getElementById('increase').classList.add('disabled');
    document.getElementById('decrease').classList.add('disabled');
    changeAll([]);
    showPers([], 2);        
    show('count-parameters', null);
}