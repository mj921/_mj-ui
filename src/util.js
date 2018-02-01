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