import config from "@/config"
import { getUrlQuery } from '@/plugins/utils'


const validateSign = ():boolean=>{
    const params = getUrlQuery(location.search.substring(1))

    // 验证签名
    const appId = params.appId;
    const time = params.time;
    const sign = params.sign;
    if(appId&&time&&sign){
        return config.getSign(time,appId)===sign
    }else{
        // 参数不全 拒绝访问
        if(!appId){
            document.write('缺少参数appId；')
        }
        if(!time){
            document.write('缺少参数time；')
        }
        if(!sign){
            document.write('缺少参数sign；')
        }
        return false
    }
}




export  default validateSign