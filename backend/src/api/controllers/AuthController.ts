import { Request, Response, NextFunction } from 'express';
import Controller from './Controller';

/**
 * AuthController
 * @extends Controller
 */
class AuthController extends Controller {

    /**
     * Signin user
     * @param req Express request
     * @param res Express response
     * @param next Express next function
     */
    public async signin(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return res.json({ message: 'Working' });
    }

}

export default AuthController;