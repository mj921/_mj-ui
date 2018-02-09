import Confirm from "./confirm.vue";

const $Confirm = function(Vue){
    var MjConfirm = Vue.extend(Confirm);
    Vue.prototype.$confirm = function(opt){
        opt = opt || {};
        var confirm = new MjConfirm({propsData:opt});
        confirm.confirmFun = function(){
            if(opt.confirmFun){
                opt.confirmFun();
            }
            document.body.removeChild(confirm.$mount().$el);
            confirm.$destroy();
        };
        confirm.cancelFun = function(){
            if(opt.cancelFun){
                opt.cancelFun();
            }
            document.body.removeChild(confirm.$mount().$el);
            confirm.$destroy();
        };
        confirm.closeFun = function(){
            document.body.removeChild(confirm.$mount().$el);
            confirm.$destroy();
        };
        document.body.appendChild(confirm.$mount().$el);
    }
}
export default $Confirm;