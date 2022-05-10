import { Router } from 'express';
import { IRoute } from '../../types/global';

/**
 * Route
 */
class Route implements IRoute {
    public router: Router = Router();
}

export default Route;