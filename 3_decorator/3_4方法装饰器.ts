/**
 * @Desc:方法装饰器
 * 三个参数：
 * 对象：target
 * 属性：propertyKey
 * 描述符：descriptor
 *
 * */


const met: MethodDecorator = (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    console.log(target);// {}
    console.log(propertyKey);// getName
    console.log(descriptor);
    // { value: [Function: getName],
    //  writable: true,
    //  enumerable: false,
    //  configurable: true }
}

class Sport {
    name: string

    constructor() {
        this.name = '赵无极';
    }

    @met
    getName(): string {
        return this.name;
    }
}

const sport: any = new Sport();
console.log(sport.getName());// 赵无极
