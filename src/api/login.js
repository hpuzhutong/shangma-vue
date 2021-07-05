import tong from "@/utils/baseAxios";

let login = {
    /**
     * 获取验证码
     */
    getCode(uuid){
        return tong.get(`login/captcha/${uuid}`)
    },

    /**
     * 登录
     */
    doLogin(loginForm){
        return tong.post(`login`,loginForm)
    },




}
export default login;