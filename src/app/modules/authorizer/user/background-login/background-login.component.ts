import { Component } from '@angular/core';
import { getSession } from 'src/app/core/models/encryptData';
import { LookAndFeelModel } from 'src/app/core/models/response/urlToProgram.model';

@Component({
  selector: 'app-background-login',
  templateUrl: './background-login.component.html',
  styleUrls: ['./background-login.component.scss']
})
export class BackgroundLoginComponent {

  intervalId!: number;
  isBigBackground = false;
  isLoaded = false;

  constructor() {
    this.startPollingSessionStorage('configVisual', 100);
  }

  startPollingSessionStorage(key: string, interval: number) {
    this.intervalId = window.setInterval(() => {
      const config = getSession<LookAndFeelModel>(key);
      if (config !== null) {
        clearInterval(this.intervalId);
        this.isBigBackground = config.UseBigBackground;
        this.isLoaded = true;
      }
    }, interval);
  }

}
