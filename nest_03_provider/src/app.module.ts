import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {FacModule} from './fac/fac.module';
import {ZhiModule} from './zhi/zhi.module';
import {LeiModule} from './lei/lei.module';

@Module({
    imports: [FacModule, ZhiModule, LeiModule],
    controllers: [AppController],
    // 简写方式
    // providers: [AppService],
    providers: [
        {
            provide: 'APP_SERVICE',
            useClass: AppService
        }

    ]
})
export class AppModule {
}
