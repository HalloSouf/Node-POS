import { IConfig } from '../types/global';

const config: IConfig = {
    appname: process.env.APP_NAME || 'Node-POS',
    environment: process.env.APP_ENV || 'development',
    port: parseInt(process.env.APP_PORT || '3020')
}

export default config;