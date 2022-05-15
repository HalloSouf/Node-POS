import { PrismaClient } from '@prisma/client';
import UserSeeder from './UserSeeder';

/**
 * Main
 */
class Main {

    private readonly prisma: PrismaClient = new PrismaClient();

    constructor() {
        this.prisma = new PrismaClient();
    }

    public run(): void {
        new UserSeeder(this.prisma)
            .run();
    }

}

new Main().run();