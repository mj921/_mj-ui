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
//ajax请求
const _ajax = function(option){
    if(window.XMLHttpRequest){
        var xmlHttp = new XMLHttpRequest();
    }else{
        var xmlHttp =  new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(option.url){
        option.type = option.type.toLowerCase();
        if(option.type === "post"){
            xmlHttp.open("post",option.url,option.async === false ? false : true);
            if(option.isFormData){
                var dataStr = new FormData();
                for(maitem in option.data){
                    var s = option.data[maitem];
                    dataStr.append(maitem,s);
                }
                if(option.fileParameter && option.fileParameter.length > 0){
                    for(var i = 0,len = option.fileParameter.length;i < len;i++){
                        dataStr.append(option.fileParameter[i],option.file[i],option.filename[i]);
                    }
                }
                xmlHttp.send(dataStr);
            }else{
                xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");
                var dataStr = "";
                for(maitem in option.data){
                    var s = option.data[maitem];
                    if(typeof s === "object"){
                        s = JSON.stringify(s);
                    }else{
                        s += "";
                    }
                    s = s.replace(/\%/g,"%25");
                    s = s.replace(/\//g,"%2F");
                    s = s.replace(/\?/g,"%3F");
                    s = s.replace(/\+/g,"%2B");
                    s = s.replace(/\&/g,"%26");
                    s = s.replace(/\=/g,"%3D");
                    s = s.replace(/\#/g,"%23");
                    dataStr += maitem + "=" + s + "&";
                }
                if(dataStr.charAt(dataStr.length - 1) === "&"){
                    dataStr = dataStr.substr(0,dataStr.length - 1);
                }
                xmlHttp.send(dataStr);
            }
        }else if(option.type == "get"){
            xmlHttp.open("get",option.url,option.async === false ? false : true);
            xmlHttp.send();
        }
        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
                if(option.success){
                    switch(option.dataType){
                        case "json":
                            var result = xmlHttp.responseText[0] == "{" && xmlHttp.responseText[xmlHttp.responseText.length - 1] == "}" || (xmlHttp.responseText[0] == "[" && xmlHttp.responseText[xmlHttp.responseText.length - 1] == "]") ? JSON.parse(xmlHttp.responseText) : xmlHttp.responseText;
                            break;
                        case "text":
                            var result = xmlHttp.responseText;
                            break;
                        default:
                            var result = xmlHttp.responseText;
                            break;
                    }
                    option.success(result);
                };
            }else if(xmlHttp.readyState == 4 && xmlHttp.status == 400){
                if(option.error){
                    option.error({errorMsg:"请输入url",result:xmlHttp.responseText});
                }
            }else if(xmlHttp.readyState == 4){
                if(option.error){
                    option.error();
                }
            }
        }
    }else{
        if(option.error){
            option.error({errorMsg:"请输入url"});
        }
    }
}
module.exports.objCopy = _objCopy;
module.exports.addZero = _addZero;
module.exports.dateFmt = _dateFmt;
module.exports.ajax = _ajax;