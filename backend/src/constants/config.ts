import { IConfig } from '../types/global';

const config: IConfig = {
    appname: process.env.APP_NAME || 'Node-POS',
    environment: process.env.APP_ENV || 'development',
    port: parseInt(process.env.APP_PORT || '3020'),
    url: process.env.APP_URL || 'https://nodepos.com',
    jwt: {
        audience: `http://${process.env.APP_URL}`,
        issuer: 'NodePos',
        expiresIn: '1h'
    }
}

export default config;