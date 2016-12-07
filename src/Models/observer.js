import $ from 'jquery';

let observer = (function () {

    function errorMessageClear(){
        $('#errorBox').hide();
    }

    return {errorMessageClear}
})();

export default observer;