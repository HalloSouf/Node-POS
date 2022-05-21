import { PrismaClient as IPrismaClient } from '@prisma/client';
import PrismaClient from '../../utils/Database';

/**
 * Service
 */
class Service {

    /**
     * Get prisma client
     */
    protected get prisma(): IPrismaClient {
        return PrismaClient;
    }

}

export default Service;