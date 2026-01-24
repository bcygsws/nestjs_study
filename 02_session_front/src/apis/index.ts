/**
 * @Desc:验证码提交api
 *
 *
 * */
import $http from '@/utils';

export interface ICode {
    user: string;
    pass: string;
    code: string;
}

const postCode = (data: ICode) => {
    return $http.request({
        method: 'POST',
        url: 'api/session/code',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    });
}
export {
    postCode
}
