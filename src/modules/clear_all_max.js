import clearAll from './clear_all';
import clearComplect from './clear_complect';

export default () => {
    if (document.getElementById('accept').getAttribute('data-func') != 'clearAllMax') return;   

    document.getElementById('accept').setAttribute('data-func','clearAll');
    clearAll();
    document.getElementById('accept').setAttribute('data-func','clearComplect');
    clearComplect();
}