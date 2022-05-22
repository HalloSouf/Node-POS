import { Request, Response, NextFunction } from 'express';
import ApiError from '../../utils/ApiError';
import AuthService from '../services/AuthService';

const auth = new AuthService();

export const authMiddleware = {

    extract: async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const token = req.headers['authorization'] && req.headers['authorization'].split('Bearer ')[1];
        if (!token) return new ApiError('NO_AUTH_HEADER').send(res);

        try {
            const payload = await auth.verify(token);
            req.payload = payload;
        } catch {
            return new ApiError('INVALID_TOKEN').send(res);
        }

        next();
    }

}