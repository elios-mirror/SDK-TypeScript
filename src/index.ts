import { createConnection, EliosProtocol } from 'elios-protocol';
import * as fs from "fs";
import { join } from 'path';
import EliosWidget from "./widget";



/*
 * File Created: Sunday, 13th January 2019
 * Author: HUBERT Léo
 * -----
 * Last Modified: Wednesday, 27th November 2019
 * Modified By: HUBERT Léo
 * -----
 * Copyright - 2019 HUBERT Léo
 * MIT
 */


export default class Sdk {

  private appName: string = "";

  private connection: any;

  private resolve: any = null;

  constructor() {
    let configPath = 'elios.yml';
    if (process.env.NODE_ENV === 'test') {
      configPath = join(__dirname, './__tests__/elios.yml');
    }
    const file = fs.readFileSync(fs.openSync(configPath, 'r'), { encoding: 'utf-8' });
    this.appName = file.split('name:')[1].split('\n')[0].replace(new RegExp('"', 'g'), '').trim();

    this.connection = createConnection('/tmp/elios_mirror', this.appName, true);
    this.connection.receive((data: string, senderId: number, commandType: number, reply: (msg: string, cmd: number) => {}) => {
      switch (commandType) {
        case 5:
          this.resolve(JSON.parse(data));
          break;
      }
    });
  }

  public createWidget() {
    return new EliosWidget(this.connection);
  }

  public close() {
    this.connection.close();
  }

  public config() {
    return new Promise((resolve) => {
      this.connection.send('', 4);
      this.resolve = resolve;
    });
  }
}
