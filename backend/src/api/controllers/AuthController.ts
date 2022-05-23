import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import Controller from './Controller';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';

/**
 * AuthController
 * @extends Controller
 */
class AuthController extends Controller {

    private readonly users: UserService = new UserService();
    private readonly auth: AuthService = new AuthService();

    /**
     * Signin user
     * @param req Express request
     * @param res Express response
     * @param next Express next function
     */
    public async signin(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return new this.ApiError('INCORRECT_BODY').send(res);

        try {
            const user = await this.users.find({
                where: { username: req.body.code }
            });

            if (!user || !this.auth.compareHash(req.body.password, user.password)) {
                return new this.ApiError('INCORRECT_CREDENTIALS').send(res);
            }

            const token = this.auth.createToken({ id: user.id });
            const refresh = this.auth.createToken({ id: user.id }, { expiresIn: '3h' });

            // @ts-ignore !! Alternative workaround. Passwords needs to be deselected while quering the user-data
            delete user.password;
            return res.json({ user, token, refresh });
        } catch (e: any) {
            this.Logger.error(e);
            return new this.ApiError('UNKNOWN_ERROR').send(res);
        }
    }

    /**
     * Refresh token
     * @param req Express request
     * @param res Express response
     * @param next Express next function
     */
    public async refresh(req: Request, res: Response, next: NextFunction): Promise<Response> {
        if (!req.tokens.refresh.payload) {
            return new this.ApiError('INVALID_REFRESH').send(res);
        }

        let userId = req.tokens.refresh.payload.id;
        try {
            const token = this.auth.createToken({ id: userId });
            const refresh = this.auth.createToken({ id: userId }, { expiresIn: '3h' });

            return res.json({ token, refresh });
        } catch (e: any) {
            this.Logger.error(e);
            return new this.ApiError('UNKNOWN_ERROR').send(res);
        }
    }

    /**
     * Check if user is authenticated
     * @param req Express request
     * @param res Express response
     * @param next Express next function
     */
    public async authenticated(req: Request, res: Response, next: NextFunction): Promise<any> {
        if (!req.tokens.authorization.payload) {
            return new this.ApiError('NOT_AUTHENTICATED').send(res);
        }

        try {
            const user = await this.users.find({ 
                where: { id: req.tokens.authorization.payload.id }
            });
            
            // @ts-ignore !! Alternative workaround. Passwords needs to be deselected while quering the user-data
            delete user.password;
            return res.json({ user });
        } catch (e: any) {
            this.Logger.error(e);
        }
    }

}

export default AuthController;