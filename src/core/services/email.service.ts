import { Injectable } from '@nestjs/common';
import { MailDataRequired, MailService } from '@sendgrid/mail';
import { monoEnum } from 'mono-utils-core';
import { config } from '../config';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class EmailService {
    constructor(private readonly mailService: MailService, private readonly customLoggerService: CustomLoggerService) {}

    private sendMail(receiver: string, content: string, subject: string) {
        const mail: MailDataRequired = {
            to: receiver,
            from: config.SENDGRID_SENDER,
            subject: subject,
            html: `<div>
                        <p>${content}</p>
                        </br>
                        <p>Thanks,</p>
                        <p>Mono Infinity Team</p>
                    </div>`,
            mailSettings: {
                sandboxMode: {
                    // enable: config.NODE_ENV === monoEnum.NODE_ENV_MODE.DEVELOPMENT || config.NODE_ENV === monoEnum.NODE_ENV_MODE.TEST,
                    enable: false,
                },
                footer: {
                    html: `<div>
                                <p>Thanks,</p>
                                <p>Mono Infinity Team</p>
                            </div>`,
                    enable: true,
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
            `
                                                <div>
                                                    <h2>Hello, ${receiver}</h2>
                                                    <p>Please click to this link to verify your email:</p>
                                                    <a href="${config.SENDGRID_URL}/user/verify-email/${otp}"></a>
                                                </div>
        `,
            'From Mono Infinity Team with Love',
        );
    }
}
