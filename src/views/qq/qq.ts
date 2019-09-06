import * as Url from 'url-parse';

import { getUrlQuery } from '@/plugins/utils'
import validateSign from '@/plugins/sign'

const params = getUrlQuery(location.search.substring(1));
const redirectUrl = decodeURIComponent(params.kuman_redirect)
// 验证签名
if(validateSign()&&redirectUrl){    
    // 将除了appId,time,sign,kuman_redirect参数外的参数原封不动传到重定向地址；
    // qq比较特殊，token是附在hash上，需要额外获取hash上的token；
    let oldParams:any = {};
    const clearParamList = ['appId','time','sign','kuman_redirect'];
    for(let key in params){
        if(!clearParamList.includes(key)){
            oldParams[key] = params[key]
        }
    }
    
    // 获取qq登录信息
    const token = getUrlQuery(location.hash.substring(1),'access_token');
    oldParams['token'] = token

    // 解析跳转url
    const willRedirect = new Url(redirectUrl);

    // 将token传入将要跳转的url中
    const redirectUrlQuery:any = willRedirect.query
    const redirectOldParams = getUrlQuery(redirectUrlQuery.substring(1)) 
    const newParams = Object.assign({},redirectOldParams,oldParams)
    willRedirect.set('query',newParams);
    
    // 跳转
    const willRedirectUrl = willRedirect.toString()
    location.replace(willRedirectUrl)
}
