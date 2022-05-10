import { Router } from 'express';
import Server from '../Server';
import AuthRoute from './AuthRoute';

/**
 * Initialise routes
 * @param router Express router
 * @param prefix URL prefix
 */
export const initRoutes = ({ application, options }: Server): void => {
    application.use(`${options.prefix}/auth`, new AuthRoute().router);
}