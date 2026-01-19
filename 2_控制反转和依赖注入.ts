/**
 * @Desc: 控制反转和依赖注入
 * @Author: Bao Chengyi
 *
 * 控制反转和依赖注入
 *
 *
 *
 * */
// 耦合代码
class A {
    name: string;

    constructor() {
        this.name = '小满堂';
    }

}

class B {
    constructor() {
        console.log(new A().name);
    }
}

class C {
    constructor() {
        console.log(new A().name);
    }
}

/*
* 分析：B和C类都依赖A类，当我们修改A类为有参构造函数时
* class A{
* 	name: string;
*   constructor(name:string){
* 		this.name=name;
* 		}
* }
*
* B和C类中的代码都需要修改
*
*
*  */

// 控制反转后的代码，解决高耦合的问题
class B1 {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class C1 {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Container {
    mo: any;

    constructor() {
        this.mo = {};
    }

// 注入函数provide
    provide(key: string, mo: any) {
        this.mo[key] = mo;
    }

// 获取函数
    get(key: string) {
        return this.mo[key];
    }

}

const mo = new Container();
// Container类接管B1和C1类的创建和依赖管理权
mo.provide('B1', new B1('小满开心'));
mo.provide('C1', new C1('小满生活圈'));

// 在A类中获取B类和C类实例
class A1 {
    b1: any;
    c1: any;

    constructor(mo: Container) {
        this.b1 = mo.get('B1');
        this.c1 = mo.get('C1');
    }

}

new A1(mo);
/**
 * 在container中注入了B1和C1类实例
 *
 * 在第三方类A中，使用mo的get方法获取B1和C1类实例,无需关注B1和C1类里的细节
 *
 * 参考：https://www.baidu.com/s?wd=%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC%E5%92%8C%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5%E7%9A%84%E7%90%86%E8%A7%A3(%E9%80%9A%E4%BF%97%E6%98%93%E6%87%82)&rsv_spt=1&rsv_iqid=0xbdcc56f300e64794&issp=1&f=3&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_dl=ts_5&rsv_enter=1&rsv_btype=t&rsv_t=1980Uj7x7ayNptoXblvSpcJ3yyfe8%2BgFaV22o2DbPelE3sxCjUwuIteSvI4o9dwK9y1K&oq=%25E9%259D%25A2%25E5%2590%2591%25E5%2588%2587%25E9%259D%25A2%25E7%25BC%2596%25E7%25A8%258B&rsv_pq=a80c28cb0103eb18&rsv_sug3=25&rsv_sug1=20&rsv_sug7=101&prefixsug=%25E6%2596%25B0%25E6%25B5%25AA%25E5%25BE%25AE%25E5%258D%259A&rsp=5&rsv_sug9=es_0_0&rsv_sug=9
 *
 *
 * 总结一下‌：
 * a. 控制反转（IoC,Inversion of control）‌ 是‌目标‌：把对象的创建和依赖管理的控制权，从对象内部反转到外部容器
 * b. 依赖注入（DI,dependency injection）‌ 是‌手段‌：容器通过构造函数、属性或setter注入，把对象需要的依赖“注入”进去，
 * 从而实现控制反转
 * 参考：https://blog.csdn.net/m0_63819687/article/details/154985623
 *
 * 补充学习-Spring Boot中的IOC/DI
 * IoC/DI 控制反转和依赖注入是谁执行的？
 * 是Spring IoC容器（具体来说是ApplicationContext类）
 * 作用类似于【对象管家】
 *
 * 详细过程：
 * 1.项目启动时，会自动扫描所有带有@Controller、@Service、@Component 注解的类
 * 2.容器内会自动创建这些类的实例（Bean），并管理它们的生命周期（创建、初始化、销毁）
 * 3.当有类如Controller需要依赖某个类的Bean(例如Service)时，容器就会利用DI （依赖注入）机制，将这个bean注入到这个类中
 *
 *
 * */



