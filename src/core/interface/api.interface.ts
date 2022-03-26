import { JoiError } from './joiError.interface';

/**
 * This is response for developer. The response contain technical info
 */
export interface ResponseForDeveloperDetail {
    message?: JoiError;
    errorMessage?: JoiError;
    [key: string]: JoiError;
}

/**
 * This is response for client. The response containe message that tell
 * client what is wrong
 */
export interface ResponseForClientDetail {
    message?: string;
    errorMessage?: string;
    [key: string]: string;
}

export interface ResponseForDeveloper<T> {
    data?: T;
    details?: ResponseForDeveloperDetail;
}

export interface ResponseForClient<T> {
    data?: T;
    details?: ResponseForClientDetail;
}
