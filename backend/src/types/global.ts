import { Router } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IRoute {
    router: Router;
}

export interface IConfig {
    appname: string;
    environment: string;
    port: number;
    url: string;
    jwt: {
        audience: string;
        issuer: string;
        expiresIn: string;
    }
}

declare global {
    namespace Express {
        interface Request {
            payload: JwtPayload;
        }
    }
}