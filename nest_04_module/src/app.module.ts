import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {PersonModule} from './person/person.module';
import {ConfigModule} from './config/config.module';

@Module({
    imports: [
        UserModule,
        PersonModule,
        // ConfigModule
        ConfigModule.forRoot({
            path: '/xiaoman',
        })// 返回值类型是DynamicModule（nestjs内置的模块）动态模块
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
