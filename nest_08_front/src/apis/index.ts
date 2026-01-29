/**
 * @Desc:下载图片
 *
 *
 * */
import $http from "@/utils/http.ts";


// 压缩后，下载图片
const getCompressSteam = () => {
    return $http.request({
        method: 'GET',
        url: '/api/download/stream'
    })
}
export {
    getCompressSteam

}
