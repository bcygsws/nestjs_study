/**
 * @Desc:参数装饰器
 * 三个参数
 * target:对象
 * propertyKey:方法名称
 * parameterIndex:参数索引
 *
 * 特别注意：
 * 参数装饰器和方法装饰器一样，propertyKey拿到的都是方法名称，只是第三个参数不同；
 * 参数装饰器拿的参数索引是参数的索引，从0开始；方法装饰器第三参数是描述符descriptor
 *
 *
 * */

const MyParam: ParameterDecorator = (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    console.log(target);// { }
    console.log(propertyKey);// getName
    console.log(parameterIndex);// 1 ,表示当前参数是第二个参数(索引通常默认从0开始)
}


class Student {
    public name: string;

    constructor() {
        this.name = '';
    }

    getName(name: string, @MyParam age: string): string {
        return `${name}---${age}`;
    }
}

const student: any = new Student();
console.log(student.getName('小满堂', '18'));
