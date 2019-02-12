/*
 * File Created: Sunday, 13th January 2019
 * Author: HUBERT Léo
 * -----
 * Last Modified: Tuesday, 12th February 2019
 * Modified By: HUBERT Léo
 * -----
 * Copyright - 2019 HUBERT Léo
 * MIT
 */

import * as net from 'net';

const SOCKETFILE = '/tmp/elios.sock';

export default class SocketService {
  private client: net.Socket;

  constructor() {
    // console.log("Connecting to server.");
    this.client = net
      .createConnection(SOCKETFILE)
      .on('connect', () => {
        // console.log("Connected.");
      })
      // Messages are buffers. use toString
      .on('data', data => {
        if (data.toString() === '__boop') {
          // console.info('Server sent boop. Confirming our snoot is booped.');
          this.client.write('__snootbooped');
          return;
        }
        if (data.toString() === '__disconnect') {
          // console.log('Server disconnected.')
        }

        // Generic message handler
        // console.info('Server:', data.toString())
      })
      .on('error', data => {
        // console.error('Server not active.'); process.exit(1);
      });
  }

  public send(event: string, data: any) {
    this.client.write(`${data}`);
  }

  public on(event: string, callback: (data: string) => void) {
    return this.client.on('data', data => {
      if (data.toString() === '__boop') {
        return;
      }
      callback(data.toString());
    });
  }
}
