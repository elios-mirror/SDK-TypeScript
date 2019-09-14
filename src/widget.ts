/*
 * File Created: Thursday, 16th May 2019
 * Author: HUBERT Léo
 * -----
 * Last Modified: Wednesday, 22nd May 2019
 * Modified By: HUBERT Léo
 * -----
 * Copyright - 2019 HUBERT Léo
 * MIT
 */

export default class Widget {


  constructor(private eliosProtocol: any) {
    this.eliosProtocol.send('', 0);
  }

  public html(html: string): void {
    this.eliosProtocol.send(html, 2);
  }

}