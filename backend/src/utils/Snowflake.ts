const epoche: number = 1_662_328_000;
let factor: number = 0;

/**
 * Snowflake
 */
class Snowflake {

    /**
     * Generate new ID
     */
    public static generate(): string {
        let timestamp = Date.now();
        if (factor >= 4095) factor = 0;

        let binary: Array<string> = [];
        binary[0] = (timestamp - epoche).toString(2).padStart(42, '0');
        binary[1] = (1).toString(2).padStart(5, '0') + (0).toString(2).padStart(5, '0');
        binary[2] = (factor++).toString(2).padStart(12, '0');

        return this.toID(binary.join(''));
    }

    /**
     * Convert binary to an ID decimal
     * @param binary Binary string
     */
    private static toID(binary: string): string {
        let dec: string = '';

        while (binary.length > 50) {
            const high: number = parseInt(binary.slice(0, -32), 2);
            const low = parseInt((high % 10).toString(2) + binary.slice(-32), 2);
            
            dec = (low % 10).toString() + dec;
            binary =
                Math.floor(high / 10).toString(2) +
                Math.floor(low / 10)
                    .toString(2)
                    .padStart(32, '0');
        }

        let mutatedBinary: number = parseInt(binary, 2);
        while (mutatedBinary > 0) {
            dec = (mutatedBinary % 10).toString() + dec;
            mutatedBinary = Math.floor(mutatedBinary / 10);
        }

        return dec;
    }

}

export default Snowflake;