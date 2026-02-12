import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: any) => ({
                type: configService.get('DB_TYPE'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                database: configService.get('DB_NAME'),
                // entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: configService.get('DB_SYNC'),
                autoLoadEntities: configService.get('AUTO'),
                logging: configService.get('DB_LOGGING'),
                retryDelay: configService.get('DELAY'),
                retryAttempts: configService.get('ATTEMPTS')
            }),
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
