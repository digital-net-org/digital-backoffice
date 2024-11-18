/// <reference types="vite/client" />

// interface ImportMetaEnv {}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare const global: Window;
declare const APP_VERSION: string;
declare const APP_DOCUMENT_NAME: string;
declare const APP_DOCUMENT_NAME_SEPARATOR: string;
declare const APP_ERROR_PREFIX: string;
declare const APP_PATH_NOT_FOUND: string;
declare const APP_PATH_HOME: `/${string}`;
declare const APP_PATH_LOGIN: `/${string}`;
declare const APP_PATH_VIEWS: `/${string}`;
declare const APP_PATH_FRAMES: `/${string}`;
declare const APP_LS_KEY_USER: string;
declare const APP_LS_KEY_THEME: string;
declare const DIGITAL_API_URL: string;
