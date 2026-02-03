import {createParamDecorator, ExecutionContext, SetMetadata} from '@nestjs/common';
import {Request} from "express";

// 可以简化SetMetadata('roles', ['admin']),成为@Role('admin')
export const Role = (...args: string[]) => {
    console.log(`args:`, args);
    return SetMetadata('roles', args);
};

export const ReqUrl = createParamDecorator((data: string, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    console.log(`data:`, data);
    console.log(`req:`, req.url);
    // return req.url;
    return req.originalUrl;
})
