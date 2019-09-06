import * as md5 from 'md5';
const signSecurity = '1d07433912df66b0ee1eabf4b1da94a2'

export default {
    signSecurity,
    getSign:(time:number,appId:string):string=>{
        return md5(time+appId+md5(signSecurity+time))
    }
}