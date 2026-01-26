import {DynamicModule, Global, Module} from '@nestjs/common';

// @Global()// 使得config成为全局模块
// @Module({
//     providers: [
//         {
//             provide: 'USE_BASE',
//             useValue: {base: '/api'}
//         }
//     ],
//     exports: [// 虽然已经给予@Global()修饰，但仍然需要exports导出去
//         {
//             provide: 'USE_BASE',
//             useValue: {base: '/api'}
//         }
//     ]
//
// })
// // 需要在父级app模块中导入
// export class ConfigModule {
// }

// 生成动态模块，DynamicModule


export interface IOption {
    path: string;
}

@Global()// 使得config成为全局模块
@Module({})
// 需要在父级app模块中导入
export class ConfigModule {
    static forRoot(option: IOption): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: 'USE_BASE',
                    useValue: {base: '/api' + option.path}
                }
            ],
            exports: [// 虽然已经给予@Global()修饰，但仍然需要exports导出去
                {
                    provide: 'USE_BASE',
                    useValue: {base: '/api' + option.path}
                }
            ]

        }
    }
}

/**
 * @Desc:动态模块的生成方法
 * 1.先正常创建一个模块，比如：以上生成动态模块前的Config模块
 * 2.在模块文件xx.module.ts的导出类中，添加一个装饰器@Global()，使其成为全局模块
 * 3.在导出当前模块类的方法中，书写一个静态方法，该方法返回值类型为内置的DynamicModule
 *
 * @Global()
 * @Module({})
 * export class ConfigModule {
 *     static forRoot(option: IOption): DynamicModule {
 *         return {
 *             module: ConfigModule,
 *             providers: [
 *                 {
 *                     provide: 'USE_BASE',
 *                     useValue: {base: '/api' + option.path}
 *                 }
 *             ],
 *             exports: [// 虽然已经给予@Global()修饰，但仍然需要exports导出去
 *             {
 *                 provide: 'USE_BASE',
 *                 useValue: {base: '/api' + option.path}
 *             }
 *             ]
 *         }
 *     }
 * }
 *
 * 熟记：nestjs面向切面编程的生命周期：
 * 客中守拦管，控服拦过响
 *    客户端--->中间件---守卫---请求拦截器---管道
 *      |                                      |
 *   响应<---过滤器---响应拦截器---服务器---控制器
 *
 *
 * */
