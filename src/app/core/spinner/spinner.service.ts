import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  /** האם הספינר מוצג */
  public readonly loading = signal(false);

  public show(): void {
    this.loading.set(true);
  }

  public hide(): void {
    this.loading.set(false);
  }
}
