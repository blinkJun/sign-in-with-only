// 获取url参数
const getUrlQuery = function (search,variable) {
    var query = search;
    var vars = query.split("&");
    var json = {}
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        json[pair[0]] = pair[1]
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    if(variable){
        return undefined
    }else{
        return json
    }
};


export  {
    getUrlQuery
}