"use strict";
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
 *
 * */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const doc = (target) => {
    target.prototype.name = '左宗棠';
};
// tsc --init 命令生成tsconfig.json文件
// 装饰器实际是语法糖，是试验性功能，需要在tsconfig.json中配置experimentalDecorators: true
let Person = class Person {
    constructor() {
    }
};
Person = __decorate([
    doc
], Person);
const person = new Person();
console.log(person.name);
