import Message from "./message.vue";

const $Message = function(Vue){
    let MjMessage = Vue.extend(Message);
    Vue.prototype.$message = function(opt){
        opt = opt || {};
        var message = new MjMessage();
        var message = new MjMessage({propsData:opt});
        message.message = (opt.message === undefined || opt.message === null) ? "" : opt.message;
        document.body.appendChild(message.$mount().$el);
        setTimeout(function(){
            document.body.removeChild(message.$mount().$el);
            message.$destroy();
        },opt.time || 3000);
    }
}
export default $Message;