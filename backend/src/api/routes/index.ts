import Server from '../Server';
import AuthRoute from './AuthRoute';
import { ModulesMiddleware } from '../middleware';

/**
 * Initialise routes
 * @param server Express server instance
 */
export const initRoutes = ({ application, config }: Server): void => {
    ModulesMiddleware.register(application);
    application.use(`${config.prefix}/auth`, new AuthRoute().router);
}