import axios from "axios";

/**
 * @Desc: 创建axios请求$http
 *
 * */
const $http = axios.create({
    // baseURL: '',
    timeout: 5000
});
$http.interceptors.request.use((config) => {
    console.log(`请求开始==`, config);
    if (config.url.indexOf('/api/download/stream') !== -1 || config.url.indexOf('/api/download/album') !== -1) {
        config.responseType = 'blob';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

$http.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
})
export default $http;
