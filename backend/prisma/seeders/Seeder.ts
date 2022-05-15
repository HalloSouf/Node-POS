/**
 * Seeder
 */
class Seeder {

    public readonly seeder: string;

    constructor(seeder: string) {
        this.seeder = seeder;
    }

    public success(): void {
        console.log(`✅ ${this.seeder} seeder is successfully executed!`);        
    }

    public failed(e: Error): void {
        console.log(`❗ Error while executing ${this.seeder} seeder: \n ${e}`);
    }

}

export default Seeder;