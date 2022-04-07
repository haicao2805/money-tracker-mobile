import { Injectable } from '@nestjs/common';
import { MailDataRequired, MailService } from '@sendgrid/mail';
import { config } from '../config';
import { CustomLoggerService } from './logger.service';
import * as _ from 'lodash';
import { readFileSync } from 'fs';
import * as path from 'path';

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

    async sendEmailForVerify(receiver: string, token: string) {
        const html = readFileSync(path.join(__dirname, '../../../public/template/verifyEmail.html'), { encoding: 'utf8' });
        console.log(html);
        const emailVerify = _.template(html);
        console.log(emailVerify({ receiver: receiver, serverURL: config.SERVER_URL, token: token }));
        return await this.sendMail(receiver, 'VERIFY EMAIL', emailVerify({ receiver: receiver, serverURL: config.SERVER_URL, token: token }));
    }
}
