/**
 * @Desc:属性装饰器
 *
 * */


const currency: PropertyDecorator = (target: any, propertyKey: string | symbol) => {
    console.log(target);// {}
    console.log(propertyKey);//  name
}


class Animal {
    @currency
    name: string;

    constructor() {
        this.name = '小满堂';
    }

    getName(): string {
        return this.name;
    }
}

const animal: any = new Animal();
console.log(animal.getName());// 小满堂
