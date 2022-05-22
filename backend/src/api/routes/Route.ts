import { Router } from 'express';
import { authMiddleware } from '../middleware';
import { IRoute } from '../../types/global';

/**
 * Route
 */
class Route implements IRoute {

    /**
     * Router
     */
    public router: Router = Router();

    /**
     * Authentication middleware
     */
    protected authMiddleware: typeof authMiddleware = authMiddleware;

}

export default Route;