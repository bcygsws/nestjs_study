/**
 * @Desc:工具类
 *
 *
 * */
export interface User {
    id?: string
    name: string
    desc: string
    createdAt?: Date
}

export interface IParam {
    page: number
    limit: number
    search?: string
    total: number
    createdAt: Date
}
