//对象拷贝
const _objCopy = function(obj){
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
//数字补零
const _addZero = function(n){
    return n < 10 ? "0" + n : n + "";
}
//日期格式化
const _dateFmt = function(date,fmt){
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var obj = {
        "yyyy":date.getFullYear(),
        "yy":date.getYear(),
        "MM":_addZero(M),
        "M":M,
        "dd":_addZero(d),
        "d":d,
        "HH":_addZero(h),
        "H":h,
        "hh":_addZero(h % 12),
        "h":h % 12,
        "mm":_addZero(m),
        "m":m,
        "ss":_addZero(s),
        "s":s,
        "S":date.getTime() % 1000
    }
    for(var key in obj){
        fmt = fmt.replace(key,obj[key]);
    }
    return fmt;
}
module.exports.objCopy = _objCopy;
module.exports.addZero = _addZero;
module.exports.dateFmt = _dateFmt;