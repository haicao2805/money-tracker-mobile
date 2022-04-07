import { Injectable } from '@nestjs/common';
import { MailDataRequired, MailService } from '@sendgrid/mail';
import { monoEnum } from 'mono-utils-core';
import { config } from '../config';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class EmailService {
    constructor(private readonly mailService: MailService, private readonly customLoggerService: CustomLoggerService) {}

    private sendMail(receiver: string, subject: string, content: string) {
        const mail: MailDataRequired = {
            to: receiver,
            from: config.SENDGRID_SENDER,
            subject: subject,
            html: `${content}`,
            mailSettings: {
                sandboxMode: {
                    // enable: config.NODE_ENV === monoEnum.NODE_ENV_MODE.DEVELOPMENT || config.NODE_ENV === monoEnum.NODE_ENV_MODE.TEST,
                    enable: false,
                },
            },
        };

        return this.mailService
            .send(mail)
            .then((res) => {
                console.log(res);
                return true;
            })
            .catch((error) => {
                console.log(error.response.body);
                this.customLoggerService.error(error.response.body, 'email.service.ts', 'error');
                return false;
            });
    }

    async sendEmailForVerify(receiver: string, otp: string) {
        return await this.sendMail(
            receiver,
            'VERIFY EMAIL',
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    /* http://meyerweb.com/eric/tools/css/reset/v2.0 | 20110126License: none (public domain)*/html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video {margin: 0;padding: 0;border: 0;font-size: 100%;font: inherit;vertical-align: baseline;}/* HTML5 display-role reset for older browsers */article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {display: block;}body {line-height: 1;}ol,ul {list-style: none;}blockquote,q {quotes: none;}blockquote:before,blockquote:after,q:before,q:after {content: '';content: none;}table {border-collapse: collapse;border-spacing: 0;}img {width: full;height: full;object-fit: contain;}html {font-family: Arial, Helvetica, sans-serif;}a {text-decoration: none;color: white;}.container {max-width: 500px;margin: auto;color: white;padding: 64px 24px;background-image: linear-gradient(to right, rgb(115, 102, 254), rgb(246, 102, 174));}.logo {width: 155px;height: 64px;margin: auto;}.body {padding: 48px 0;font-size: 14px;line-height: 20px;}.body-top {margin-bottom: 16px;}.footer {text-align: center;}.footer a {font-size: 12px;opacity: 0.9s;}
                </style>
            </head>
            <body>
                <div>
                    <div class="container">
                        <div class="logo-wrapper">
                            <div class="logo">
                                <img src="http://cdn.mcauto-images-production.sendgrid.net/96bce11efbe6f18b/c8e452ac-ca53-45a1-935e-035e0dcc7598/155x64.png"
                                    alt="simi logo" />
                            </div>
                        </div>
                        <div class="body">
                            <p class="body-top">Hello <%= name %>
                            </p>
                            <p>A new way to start a conversation with your new friends!
                                Know your friends's calendar and book a date through SIMI</p>
                        </div>
                        <div class="footer">
                            <p>
                                <a href="https://simi.com.vn" target="_blank" style="color: white;">
                                    © 2022 Simi. All Rights Reserved
                                </a>
                            </p>
                            <p>
                                <a href="https://simi.com.vn/policy/index.html" style="color: white;" target="_blank">
                                    Privacy Policy
                                </a>
                                -
                                <a href=" https://simi.com.vn/terms/index.html" style="color: white;" target="_blank">
                                    Terms of use
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>`,
        );
    }
}
