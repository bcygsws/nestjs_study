import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {ConfigService} from './config.service';
import {ConfigController} from './config.controller';
import {LoggerMiddleware} from '../middleware/logger.middleware';

@Module({
    controllers: [ConfigController],
    providers: [ConfigService],

})
export class ConfigModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        /**
         * @Desc:forRoutes()方法
         * 语法：来自链式写法
         * consumer.apply().forRoutes()
         *
         *
         *
         * 1.forRoutes()方法可以接受三种参数：
         * 1.1.string：表示路由地址，例如：'config'
         * 1.2.string[]：表示路由地址，例如：['config', 'config/:id']
         * 1.3.RouteInfo：表示路由信息，例如：{path: 'config', method: RequestMethod.GET}
         * 1.4 整个控制器类
         *
         *
         * */
        // consumer.apply(LoggerMiddleware).forRoutes('config');
        // 其含义是：让/config的GET请求，消费局部中间件LoggerMiddleware，对其他请求方式的/config没有影响
        // consumer.apply(LoggerMiddleware).forRoutes({path: 'config', method: RequestMethod.GET})
        // consumer.apply(LoggerMiddleware).forRoutes({path: 'config', method: RequestMethod.POST})

        // 其含义是让整个ConfigController控制器类中的所有请求，都要消费局部中间件LoggerMiddleware
        consumer.apply(LoggerMiddleware).forRoutes(ConfigController);
    }

}
