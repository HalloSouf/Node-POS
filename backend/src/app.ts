import { createServer, Server as HTTPServer } from 'http';
import { config as insertEnv } from 'dotenv';
insertEnv();

import Server from './api/Server';
import Logger from './utils/Logger';
import config from './constants/config';

const exServer: Server = new Server({
    ...config,
    prefix: '/api'
});
const server: HTTPServer = createServer(exServer.application);

Logger.info(`Initialing back-end service on ${config.environment} environment...`);

server.listen(config.port, (): void => {
    Logger.ready(`Back-end service is running on port ${config.port}`);
});

server.on('close', (): void => {
    Logger.info('Closing back-end service...');
});