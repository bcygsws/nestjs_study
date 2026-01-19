/**
 * @Desc: 使用装饰器创建一个Get请求
 * 涉及请求数据，需要安装axios包
 *
 * 1.生成package.json文件
 * npm init -y
 *
 * 2.安装axios包
 * npm i axios -S
 *
 * 3.需要开启装饰器功能，需要生成tsconfig.json文件
 * tsc --init
 *
 * 4.生成的tsconfig.json文件，需要修改如下:
 * experimentalDecorators: true
 *
 *
 * */
import axios from "axios";

const Get = (url: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        console.log(descriptor);// { value: [Function: getList],writable:true,enumerable:false,configurable:true}
        const func = descriptor.value;// 拿到被装饰的那个方法，即getList
        console.log(`func===`, func);
        axios.get(url).then(res => {
            func(res, {
                code: 200,
                success: true
            })
        }).catch(err => {
            func(err, {
                code: 500,
                success: false
            })
        })

    }
}


class Controller {
    constructor() {
    }

    @Get('http://geek.itheima.net/v1_0/channels')// 相当于方法装饰器向后端请求了获取频道列表
    getList(res: any, status: Object) {
        // data: { data: { channels: [Array] }, message: 'OK' }
        console.log("res===", res.data.data.channels);
        console.log(status);

    }
}

// const controller: any = new Controller();
// controller.getList();
