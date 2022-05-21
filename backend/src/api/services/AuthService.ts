import { readFileSync } from 'fs';
import { sign, verify, JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import config from '../../constants/config';

/**
 * AuthService
 */
class AuthService {

    /**
     * Create hash from data string or buffer
     * @param data Data whom needs to be hashed
     */
    public hash(data: string | Buffer): string {
        return hashSync(data, genSaltSync(10));
    }

    /**
     * Compare data with hash
     * @param data Fresh string
     * @param hash Hash string
     */
    public compareHash(data: string, hash: string): boolean {
        return compareSync(data, hash);
    }

    /**
     * Assign JWT token
     * @param data Available data for JWT token
     */
    public createToken(data: object | Buffer): string {
        return sign({ ...data }, readFileSync('./keys/rsa_jwt_private.pem', {
            encoding: 'utf-8'
        }), {
            audience: config.jwt.audience,
            algorithm: 'RS256',
            issuer: config.jwt.issuer,
            expiresIn: config.jwt.expiresIn
        });
    }

    /**
     * Verify JWT token
     * @param token JWT token
     */
    public verify(token: string): Promise<string | JwtPayload> {
        return new Promise((resolve: any, reject: any) => {
            verify(token, readFileSync('./keys/rsa_jwt_public.pem', {
                encoding: 'utf-8'
            }), {
                audience: config.jwt.audience,
                algorithms: ['RS256'],
                issuer: config.jwt.issuer
            },
            (error: VerifyErrors | null, payload: string | JwtPayload | undefined) => {
                if (error) {
                    reject(error)
                }

                resolve(payload);
            });
        });
    }

}

export default AuthService;