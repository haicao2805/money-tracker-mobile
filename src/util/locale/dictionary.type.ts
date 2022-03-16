import enLocale from './dictionary/en.json';

/**
    * This is example for en.json 
    *{
    *    "key1": "value1",
    *    "key2": "value2",
    *    "key3": "value3"
    *}

    * typeof en.json = Record<key, value>

    * keyof typeof en.json = keyof Record<key, value> = key1 | key2 | key3

 */
export type Dictionary = keyof typeof enLocale;
