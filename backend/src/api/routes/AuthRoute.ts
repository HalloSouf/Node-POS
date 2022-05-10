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
        this.router.post('/', this.controller.signin.bind(this.controller));
    }

}

export default AuthRoute;