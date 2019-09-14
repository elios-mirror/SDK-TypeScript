import { createConnection } from 'elios-protocol';
import * as fs from "fs";
import { join } from "path";
import EliosWidget from "./widget";



/*
 * File Created: Sunday, 13th January 2019
 * Author: HUBERT Léo
 * -----
 * Last Modified: Saturday, 14th September 2019
 * Modified By: HUBERT Léo
 * -----
 * Copyright - 2019 HUBERT Léo
 * MIT
 */


export default class Sdk {

  private appName: string = "";

  private connection: any;

  constructor() {
    let configPath = 'elios.yml';
    if (process.env.NODE_ENV === 'test') {
      configPath = './__tests__/elios.yml';
    }
    const file = fs.readFileSync(fs.openSync(join(__dirname, configPath), 'r'), { encoding: 'utf-8' });
    this.appName = file.split('name:')[1].split('\n')[0].replace(new RegExp('"', 'g'), '').trim();

    this.connection = createConnection('/tmp/elios_mirror', this.appName, true)
    // this.connection.receive(() => {
    //   return '';
    // });
  }

  public createWidget() {
    return new EliosWidget(this.connection);
  }

  public close() {
    this.connection.close();
  }
}

// const elios = new Elios();
// elios.createWidget();
