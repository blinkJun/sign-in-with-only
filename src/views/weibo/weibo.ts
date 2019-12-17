import * as Url from 'url-parse';

import { getUrlQuery } from '@/plugins/utils'
import validateSign from '@/plugins/sign'

const params = getUrlQuery(location.search.substring(1));
const redirectUrl = decodeURIComponent(params.kuman_redirect)
// 验证签名
if(validateSign()&&redirectUrl){    
    // 将除了appId,time,sign,kuman_redirect参数外的参数原封不动传到重定向地址；
    let oldParams:any = {};
    const clearParamList = ['appId','time','sign','kuman_redirect'];
    for(let key in params){
        if(key&&!clearParamList.includes(key)){
            oldParams[key] = params[key]
        }
    }
    
    // 解析跳转url
    const willRedirect = new Url(redirectUrl);
    
    // 解析的参数传入将要跳转的url中
    const redirectUrlQuery:any = willRedirect.query
    const redirectOldParams = redirectUrlQuery?getUrlQuery(redirectUrlQuery.substring(1)):{}
    const newParams = Object.assign({},redirectOldParams,oldParams)
    willRedirect.set('query',newParams);
    
    // 跳转
    const willRedirectUrl = willRedirect.toString();
    location.replace(willRedirectUrl)
}
