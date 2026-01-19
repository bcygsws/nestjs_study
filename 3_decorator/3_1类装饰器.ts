/**
 * @Desc:类装饰器
 * 装饰器：
 * 类装饰器：ClassDecorator
 * 属性装饰器: PropertyDecorator
 * 方法装饰器: MethodDecorator
 * 参数装饰器: ParameterDecorator
 *
 * 所谓的装饰器：本质是一个函数，是在不创建实例的基础上，给类添加一些额外的属性和方法
 *
 * 1.生成tsconfig.json配置文件
 * tsc --init
 * 2.执行ts文件命令：
 * ts-node  xxxx.ts
 *
 *
 * */

const doc: ClassDecorator = (target: any) => {
    target.prototype.name = '左宗棠';
}

// tsc --init 命令生成tsconfig.json文件
// 装饰器实际是语法糖，是试验性功能，需要在tsconfig.json中配置experimentalDecorators: true
@doc
class Person {
    constructor() {
    }
}

const person: any = new Person();
//  ts-node 3_1类装饰器.ts执行
console.log(person.name);// 左宗棠






