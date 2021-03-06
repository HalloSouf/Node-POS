import { Application, json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from '../../constants/config';

export const ModulesMiddleware = {

    register: (application: Application): void => {
        application.use(helmet());
        application.use(json());
        application.use(urlencoded({ extended: false }));
        application.use(
            morgan(config.environment === 'development' ? 'common' : 'short')
        );
        application.use(
            cors({
                origin: config.environment === 'development' ? '*' : `https://${config.url}`,
                methods: ['GET', 'POST', 'HEAD', 'DELETE', 'PUT']
            })
        );
    }

}