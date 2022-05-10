import { Router } from 'express';

export interface IRoute {
    router: Router;
}

export interface IConfig {
    appname: string;
    environment: string;
    port: number;
}