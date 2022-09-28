#!/usr/bin/env node

/**
 * Module dependencies.
 */

import App from '../src/app.mjs';
import debug from 'debug';
import http from 'http';
import https from 'https';
import * as dotenv from 'dotenv';
import fs from 'fs';

const app = App.init();
debug('portal-web:server');
dotenv.config();
/**
 * Get port from environment and store in Express.
 */

/**
 * Normalize a port into a number, string, or false.
 */

 const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return undefined;
}

const port = normalizePort(process.env.PORT || '3000');
const sslPort = normalizePort(process.env.SSL_PORT);
app.set('port', port);
app.set('sslPort', sslPort);

/**
 * Event listener for HTTP server "error" event.
 */

 const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = (server) => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * HTTP server config
 */
if (port) {
    const server = http.createServer(app);
    server.listen(port);

    server.on('error', onError);
    server.on('listening', (server) => onListening);

    console.log("server ::: " + port);
}

/**
 * HTTPS server config
 */
if (sslPort) {
    const server = https.createServer({
        key: fs.readFileSync(process.env.KEY_FILE_PATH),
        cert: fs.readFileSync(process.env.CERT_FILE_PATH)
    });
    server.listen(sslPort)

    server.on('error', onError);
    server.on('listening', (server) => onListening);

    console.log("server ::: " + sslPort);
}
