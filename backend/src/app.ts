import { createServer, Server as HTTPServer } from 'http';

import Server from './api/Server';
import Logger from './utils/Logger';

const exServer: Server = new Server({
    port: 3020,
    prefix: '/api'
});
const server: HTTPServer = createServer(exServer.application);

Logger.info('Initialing back-end service...');

server.listen(exServer.options.port, (): void => {
    Logger.ready(`Back-end service is running on port ${exServer.options.port}`);
});

server.on('close', (): void => {
    Logger.info('Closing back-end service...');
});