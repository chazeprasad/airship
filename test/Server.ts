/* import app from './App';

app.listen(2020, () => {
    console.log('Example app listening on port 5678!');
}) */

import * as path from 'path';
import * as http from 'http';

import {Airship} from '../src/airship'

const ROOT_DIR = path.join(__dirname, '..')
const STATIC_DIR = ROOT_DIR + '/public'

let airship: Airship = new Airship();
airship.rootDir = ROOT_DIR;
airship.staticDir = STATIC_DIR;
airship.init();

const server = http.createServer(airship.app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(airship.port);

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof airship.port === 'string') ? 'Pipe ' + airship.port : 'Port ' + airship.port;
    console.log('bind');
    console.log(bind);
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            console.log(error)
            throw error;
    }
}

function onListening(): void {
//    debug('server')
    let addr:any = server.address();
    addr.address = addr.address == '::' ? '127.0.0.1' : addr.address

    // let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    airship.log(`server started on http://${addr.address}:${addr.port}; press Ctrl-C to terminate.'`); // eslint-disable-line no-console
    console.log(`server started on http://${addr.address}:${addr.port}; press Ctrl-C to terminate.'`); // eslint-disable-line no-console

    // debug(`Listening on ${bind}`);
}

function normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

export { server }