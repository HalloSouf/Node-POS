import { body } from 'express-validator';
import Route from './Route';
import AuthController from '../controllers/AuthController';

/**
 * AuthRoute
 * @extends Route
 */
class AuthRoute extends Route {

    private readonly controller: AuthController = new AuthController();

    constructor() {
        super();
        this.init();
    }

    /**
     * Initialise routes
     */
    private init(): void {
        this.router.post('/signin', [
            body('code').isLength({ min: 1 }),
            body('password').isLength({ min: 1 })
        ], this.controller.signin.bind(this.controller));
        this.router.post('/', [this.authMiddleware.extract], this.controller.authenticated.bind(this.controller));
    }

}

export default AuthRoute;