import { Dictionary } from '../../util/locale/dictionary.type';

export interface JoiError {
    type: Dictionary;
    context?: Record<string, string>;
}
