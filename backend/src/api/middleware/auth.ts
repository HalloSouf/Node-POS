import { Request, Response, NextFunction } from 'express';
import ApiError from '../../utils/ApiError';
import AuthService from '../services/AuthService';

const auth = new AuthService();

export const authMiddleware = {

    extractAuth: (req: Request, res: Response, next: NextFunction): Response | void => {
        let token = req.headers['authorization'] && req.headers['authorization'].split('Bearer ')[1];
        if (!token) return new ApiError('NO_AUTHENTICATION').send(res);
        
        req.tokens = {
            authorization: { value: token },
            refresh: {}
        }

        next();
    },

    extractRefresh: (req: Request, res: Response, next: NextFunction): Response | void => {
        let token = req.body['refresh_token'];
        if (!token) return new ApiError('NO_REFRESH').send(res);

        req.tokens = {
            authorization: {},
            refresh: { value: token }
        }

        next();
    },
    
    verify: async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            if (req.tokens.authorization.value)
                req.tokens.authorization.payload = await auth.verify(req.tokens.authorization.value);

            if (req.tokens.refresh.value)
                req.tokens.refresh.payload = await auth.verify(req.tokens.refresh.value);
        } catch {
            return new ApiError('INVALID_TOKEN').send(res);
        }

        next();
    }

}