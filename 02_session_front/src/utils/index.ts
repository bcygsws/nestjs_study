/**
 * @Desc:axios请求
 *
 * */
import axios from "axios";

/**
 * @bug记录：
 * 解决：参考 https://blog.csdn.net/m0_66583360/article/details/130569715
 * 原因：默认情况下，跨源请求不提供凭据（cookie、客户端http认证、客户端SSL证明等）
 *
 * 特别注意：前端axios创建$http请求对象时，create方法中，withCredentials: true，
 * 否则此处无法获取session的captchaCode数据，值为undefined
 *
 * */
const $http = axios.create({
    baseURL: '',
    timeout: 5000,
    // bug:允许携带cookie，否则后端中req.session.captchaCode取不到值
    withCredentials: true
});
// 请求拦截器
axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
})

// 响应拦截器
axios.interceptors.response.use((response) => {
    return response;
}, ((error) => {
    return Promise.reject(error);
}))
export default $http;
