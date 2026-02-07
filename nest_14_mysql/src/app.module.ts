import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";

// 本机安装了两个版本的mysql，启动mysql8.0,net start mysql8

@Module({
    imports: [UserModule, TypeOrmModule.forRoot({
        type: 'mysql',
        // username: 'admin',// mysql5.7版本使用的用户名
        username: 'root',
        password: '123456',
        host: 'localhost',
        port: 3306,
        database: 'first_db',
        // 加载实体的三种方式：
        // entities: [User],
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],// 实体文件，当autoloadEntities: true时，不需要配置entities
        autoLoadEntities: true,// 自动加载实体
        synchronize: true,// 是否自动将实体类同步到数据库
        logging: true,
        retryDelay: 500,// 重试连接数据库间隔
        retryAttempts: 10,// 重试连接数据库的次数

    })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
