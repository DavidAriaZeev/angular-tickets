import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './app-config.model';


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private config!: AppConfig;

  constructor(private http: HttpClient) {}

  /**
   * טעינת קובץ הקונפיגורציה
   * מתבצעת לפני עליית האפליקציה
   */
  load(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<AppConfig>('assets/config/app-config.json')
        .subscribe({
          next: config => {
            this.config = config;
            resolve();
          },
          error: err => {
            console.error('Failed to load app config', err);
            reject(err);
          }
        });
    });
  }

  get configuration(): AppConfig {
    return this.config;
  }
}
