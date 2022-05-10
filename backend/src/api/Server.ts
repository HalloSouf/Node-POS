import Express, { Application } from 'express';
import { initRoutes } from './routes';

/**
 * Server
 */
class Server {

    private _app: Application = Express();
    public options: ServerOptions;

    constructor(options: ServerOptions) {
        this.options = options;
        initRoutes(this);
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