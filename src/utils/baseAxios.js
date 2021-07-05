import axios from "axios";

//引入Notification 做错误弹框
import Notification from "element-ui/packages/notification/src/main";

const tong = axios.create({
    baseURL: 'http://localhost:9999/',
    // timeout:3600,
    withCredentials: true,
});

//设置拦截器
tong.interceptors.request.use(function (config) {
    let item = localStorage.getItem("token");
    config.headers.Authentication = "Bearer "+item;
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应的拦截器  当请求成功之后 先走这个拦截器  在走对应的回调函数
//对应的回掉函数的中的返回值  就由有这个地方的return的
tong.interceptors.response.use(function (response) {

    let {status,message,data} = response.data;
    if (status == 2000 || status == 5007) {
        return data;
    }else {
        Notification.error(message)
        //阻止代码向下执行
        return new Promise.reject(new Error())
    }
}, function (error) {
    return Promise.reject(error);
});


export default tong;