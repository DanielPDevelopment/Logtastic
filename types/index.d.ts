import { Colors, Styles, Background } from "ColorsAndStyles";

declare const _exports: Logtastic;
export = _exports;


declare class Logtastic {
    colors: Colors;
    styles: Styles;
    bg: Background;
    default: {
        log: {
            color: string;
            style: string;
            bg: string;
        };
        warn: {
            color: string;
            style: string;
            bg: string;
        };
        err: {
            color: string;
            style: string;
            bg: string;
        };
    };
    mode: {
        silent: boolean;
        logging: {
            toDB: {
                query: string;
                maxBatchCount: number;
                maxBatchTimeout: number;
                batchedLogs: {
                    content: string[];
                };
            };
        };
    };
    getErrorStack: () => string;
    getFormattedText: (text: Error | string) => string;
    setToDB(settings?: {}): void;

    log(text: string | object, options?: {
        color?: string;
        style?: string;
        bgStyle?: string;
        time?: boolean;
        override?: boolean;
        trace?: boolean;
    }): void;
    
    warn(text: string | object, options?: {
        color?: string;
        style?: string;
        bgStyle?: string;
        time?: boolean;
        override?: boolean;
        trace?: boolean;
    }): void;
    
    err(text: string | object, options?: {
        color?: string;
        style?: string;
        bgStyle?: string;
        time?: boolean;
        override?: boolean;
        trace?: boolean;
        escape?: boolean;
    }): void;
   
    getDefaults(): void;
    
    setDefaults(options?: {
        color?: string;
        style?: string;
        bgStyle?: string;
        type?: string;
    }): void;
    getMode(): void;
    
    setMode(options?: {
        silent?: boolean;
    }): void;
    
    help(): void;
}
