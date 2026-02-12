/**
 * @desc:crud 的请求api
 *
 *
 *
 * */
import $http from "../utils";
import type {IParam, User} from "../type";

// 初始状态或者有条件查询get请求
const getUserListApi = (param: IParam) => {
    const {page, limit, search} = param;
    return $http.request({
        method: 'GET',
        url: '/user',
        params: {
            page,
            limit,
            search
        }
    })
}

// 添加一条数据post请求
const addUserApi = (val: User) => {
    const {name, desc, createdAt} = val;
    return $http.request({
        method: 'POST',
        url: '/user',
        data: {
            name,
            desc,
            createdAt
        }
    })
}

// 根据id删除一条记录
const deleteUserApi = (id: string) => {
    return $http.request({
        method: 'DELETE',
        url: `/user/${id}`
    })
}

// 根据id修改一条记录
const updateUserApi = (val: User) => {
    const {id, name, desc} = val;
    return $http.request({
        method: 'PATCH',
        url: `/user/${id}`,
        data: {
            name,
            desc
        }
    })
}
export {
    getUserListApi,
    addUserApi,
    deleteUserApi,
    updateUserApi
}
