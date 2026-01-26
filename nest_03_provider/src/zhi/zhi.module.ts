import {Module} from '@nestjs/common';
import {ZhiService} from './zhi.service';
import {ZhiController} from './zhi.controller';
// providers的第二种方式：提供值
@Module({
    controllers: [ZhiController],
    providers: [ZhiService, {// 提供给IoC容器的键和值
        provide: 'MY_ARRAY',
        useValue: [1, 2, 3, 4, 5]
    }]
})
export class ZhiModule {
}
