import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
    // 注入reflector
    constructor(private readonly Reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('我是守卫```');
        const roles = this.Reflector.get<string[]>('roles', context.getHandler());
        console.log(`roles:`, roles);// 自定义的装饰器Role参数是string，而不是string[]，但此处打印了['admin']
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        console.log(`req:`, req.query?.roles);
        // 角色权限，只有req是admin，这种路由才能访问
        if (roles.includes(req.query?.roles)) {
            return true;
        }
        return false;
    }
}
