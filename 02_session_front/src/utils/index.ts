/**
 * @Desc:axios请求
 *
 * */
import axios from "axios";

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
