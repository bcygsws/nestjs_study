import {Controller, Get, Post, Body, Res, Req} from '@nestjs/common';
import {SessionService} from './session.service';
import * as SvgCaptcha from 'svg-captcha';

@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {
    }

    @Get('code')
    findAll(@Req() req, @Res() res) {
        let captcha = SvgCaptcha.create({
            size: 4,// 验证码字符长度
            noise: 1,// 干扰线的个数
            fontSize: 50,
            width: 140,
            height: 36,
            ignoreChars: '0o1i', // filter out some characters like 0o1i
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            // background: '#cc9966' // background color of the svg image
            background: '#ffffff' // background color of the svg image
        });
        req.session.captchaCode = captcha.text;
        console.log(`req.session.code===`, req.session.captchaCode);
        // console.log(captcha);
        res.type('image/svg+xml');
        return res.send(captcha.data);
    }

    @Post('code')
    create(@Body() body: any, @Req() req) {
        console.log(`body===`, body);
        /**
         * @bug记录：
         * 参考：https://blog.csdn.net/m0_66583360/article/details/130569715
         * 特别注意：前端axios创建$http请求对象时，create方法中，withCredentials: true，
         * 否则此处无法获取session的captchaCode数据，值为undefined
         *
         *
         * */
        console.log(`req.session.captchaCode===`, req.session.captchaCode);
        if (req.session.captchaCode?.toLowerCase() === body.code.toLowerCase()) {
            return {
                code: 200,
                message: '验证码正确'
            }
        } else {
            return {
                code: 400,
                message: '验证码错误'
            }
        }
    }

}
