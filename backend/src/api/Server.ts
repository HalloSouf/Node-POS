import Express, { Application } from 'express';

/**
 * Server
 */
class Server {

    private _app: Application = Express();
    public options: ServerOptions;

    constructor(options: ServerOptions) {
        this.options = options;
    }

    /**
     * Get Express application
     */
    public get application(): Application {
        return this._app;
    }

}

export interface ServerOptions {
    prefix: string;
    port: number;
}

export default Server;