import { AbstractControl, ValidationErrors } from '@angular/forms';

/** ולידציה לתעודת זהות ישראלית כולל ספרת ביקורת */
export function IDValidator(
    control: AbstractControl
): ValidationErrors | null {

    const value = control.value;

    if (value === null || value === undefined) {
        return null;
    }

    // חייב להיות מספר שלם ולא שלילי
    if (!Number.isInteger(value) || value < 0) {
        return { idInvalid: true };
    }

    const id = value.toString().padStart(9, '0');

    // חייב להיות בדיוק 9 ספרות אחרי padding
    if (id.length !== 9) {
        return { idInvalid: true };
    }

    let sum = 0;

    for (let i = 0; i < 9; i++) {
        let digit = Number(id[i]) * (i % 2 === 0 ? 1 : 2);
        if (digit > 9) {
            digit -= 9;
        }
        sum += digit;
    }

    return sum % 10 === 0 ? null : { idInvalid: true };
}