import { OpaqueToken } from 'angular2/core';

interface AppSettings {
    productLibFolder: string;
}

const APPSETTINGS: AppSettings = {
    productLibFolder: 'node_modules'
};

let APP_SETTINGS = new OpaqueToken('app.settings');

export {AppSettings, APPSETTINGS, APP_SETTINGS }