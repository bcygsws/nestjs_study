import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";
import {Request} from "express";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly Reflector:Reflector) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('我是守卫```');
    const roles = this.Reflector.get<string[]>('roles', context.getHandler());
    console.log(`roles:`, roles);
    const ctx = context.switchToHttp();
    const req=ctx.getRequest<Request>();
    // 测试localhost:3000/user?roles=admin
    return roles.includes(<string>req.query?.roles);

  }
}
