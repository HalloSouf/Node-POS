import { PrismaClient, Prisma } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import Seeder from './Seeder';
import Snowflake from '../../src/utils/Snowflake';

/**
 * UserSeeder
 * @extends Seeder
 */
class UserSeeder extends Seeder {

    private readonly prisma: PrismaClient;
    private readonly saltRounds: number = 10;

    constructor(prisma: PrismaClient) {
        super('User');
        this.prisma = prisma;
    }

    public async run(): Promise<void> {
        try {
            const users: Array<Prisma.UserCreateInput> = [
                {
                    id: Snowflake.generate(),
                    firstname: 'Johan',
                    lastname: 'Verhaak',
                    username: '49251',
                    password: this.hash('9856')
                },
                {
                    id: Snowflake.generate(),
                    firstname: 'Joke',
                    lastname: 'Velden',
                    username: '98746',
                    password: this.hash('9874')
                }
            ];

            await this.prisma.user.createMany({
                data: [...users]
            });

            this.success();
        } catch (e: any) {
            this.failed(e);
        }
    }

    private hash(data: string | Buffer) {
        let salt: string = genSaltSync(this.saltRounds);
        return hashSync(data, salt);
    }

}

export default UserSeeder;