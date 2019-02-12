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

import SocketService from './socket.service';

export default class Elios {
  private socketService = new SocketService();

  constructor() {
    this.socketService.on('event', data => {
      // console.log('Event trigger', data);
    });
  }

  public createWidget() {
    this.socketService.send('toto', 'foo');
  }

  public testFoo(): Promise<string> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject();
      }, 1000);
      this.socketService.on('foo', data => {
        clearTimeout(timeout);
        resolve(data);
      });
      this.socketService.send('foo', 'foo');
      this.socketService.send('foo', 'foo');
    });
  }
}

const elios = new Elios();
elios.createWidget();
