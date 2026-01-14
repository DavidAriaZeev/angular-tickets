import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  /** שגיאה הוא יתפקס עליה אוטומטית domאם קיים ב */
  public setFocusToInput() {
    setTimeout(() => { // מתעדכן אחרי לחיצה על כפתור dom כי לוקח זמן קצת עד שה timeout
      (document.querySelector("input.is-invalid, textarea.is-invalid, select.is-invalid") as HTMLElement)?.focus();
    }, 200);
  }

}
