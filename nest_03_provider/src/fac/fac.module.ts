import {Module} from '@nestjs/common';
import {FacService} from './fac.service';
import {FacController} from './fac.controller';
import {FacService2} from "./fac.service2";
import {FacService1} from "./fac.service1";

@Module({
    controllers: [FacController],
    providers: [
        FacService,
        {
            provide: 'FAC_SERVICE2',
            useClass: FacService2
        },
        {
            provide: 'USE_VAL',
            useValue: [1, 2, 3]
        },
        FacService1,
        {
            provide: 'SYNC',
            inject: [FacService1],
            useFactory(facService1: FacService1) {
                console.log(`facService1`, facService1);
                return facService1.findAll();
            }
        },
        {
            provide: 'ASYNC',
            inject: [FacService1],
            useFactory: async (facService1: FacService1) => {
                console.log(`facService1===`, facService1);
                return await new Promise((res) => {
                    setTimeout(() => {
                        res(facService1.findAll());
                    }, 5000)
                });
            }
        }
    ],
})
export class FacModule {
}
