import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
// 注意：此处Request和Response是express的，而不是@nestjs/common的
import {Request, Response} from "express";// 给request和response泛型使用

// @Catch()
// export class CommonFilter<T> implements ExceptionFilter {
//     catch(exception: T, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const request = ctx.getRequest();
//         const response = ctx.getResponse();
//         response.status(500).json({
//             message: exception,
//             path: request.url,
//             timestamp: new Date().toISOString(),
//             statusCode: 500,
//             code: 500,
//             success: false,
//         })
//     }
// }
/*
"message": {
    "response": {
      "message": "Cannot GET /excdffadsf",
      "error": "Not Found",
      "statusCode": 404
    },
    "status": 404,
    "options": {

    },
    "message": "Cannot GET /excdffadsf",
    "name": "NotFoundException"
  },
  "path": "/excdffadsf",
  "timestamp": "2026-01-31T21:13:50.773Z",
  "statusCode": 500,
  "code": 500,
  "success": false
 */

@Catch(HttpException)
export class CommonFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        response.status(500).json({
            message: exception,
            path: request.url,
            timestamp: new Date().toISOString(),
            statusCode: 500,
            code: 500,
            success: false,
        })
    }
}
