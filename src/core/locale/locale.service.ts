import * as i18n from 'i18n';
import { ResponseForClient, ResponseForDeveloper } from '../interface/api.interface';
import { Dictionary } from './dictionary.type';

export class LocaleService {
    /**
     *
     * @param key
     * @param context
     * @returns the value of the key in Dictionary
     */
    public translate(key: Dictionary, context?: i18n.Replacements) {
        const value = i18n.__(key, { ...context });
        return value;
    }

    /**
     * Translate ResponseForDeveloper into ResponseForClient
     */
    public translateResponse<T>(res: ResponseForDeveloper<T>) {
        const formatApi: ResponseForClient<T> = {
            data: res.data,
            details: {},
        };
        if (res.details) {
            for (const item in res.details) {
                formatApi.details[item] = this.translate(res.details[item].type, { ...res.details[item].context });
            }
        }

        return formatApi;
    }
}
