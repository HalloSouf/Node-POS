import { Router } from 'express';
import Server from '../Server';
import AuthRoute from './AuthRoute';

/**
 * Initialise routes
 * @param router Express router
 * @param prefix URL prefix
 */
export const initRoutes = ({ application, config }: Server): void => {
    application.use(`${config.prefix}/auth`, new AuthRoute().router);
}