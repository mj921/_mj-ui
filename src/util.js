module.exports.objCopy = function(obj){
    var o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
    for(var key in obj){
        if(typeof obj[key] == "object"){
            o[key] = arguments.callee(obj[key]);
        }else{
            o[key] = obj[key];
        }
    }
    return o;
} 
module.exports.addZero = function(n){
    return n < 10 ? "0" + n : n + "";
}