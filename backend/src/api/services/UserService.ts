import { Prisma } from '@prisma/client';
import Service from './Service';

/**
 * UserService
 * @extends Service
 */
class UserService extends Service {

    /**
     * Find user
     * @param options User options
     */
    public async find(options: Prisma.UserFindFirstArgs) {
        try {
            return await this.prisma.user.findFirst({ ...options });
        } catch (e: any) {
            throw e;
        }
    }

}

export default UserService;