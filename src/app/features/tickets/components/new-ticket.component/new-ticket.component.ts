import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service';
import { NewTicketRequest } from '../../models/ticket.model';
import { IDValidator } from '../../../../shared/Validators';
import { UtilsService } from '../../../../core/services/utils.service';

@Component({
  standalone: true,
  selector: 'app-new-ticket',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTicketComponent {

  private readonly fb = inject(FormBuilder);
  private readonly utils = inject(UtilsService);
  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);

  public readonly success = signal(false);
  public readonly submitted = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    userId: [
      null,
      [
        Validators.required,
        Validators.max(999999999),
        IDValidator
      ]
    ],
    subject: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.maxLength(300)
      ]
    ]
  });

  /** שליחה */
  protected submit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.utils.setFocusToInput();
      return;
    }

    const objToSend: NewTicketRequest = {
      userId: this.form.value.userId!,
      subject: this.form.value.subject!,
      description: this.form.value.description!
    }
    this.ticketService.addTicket(objToSend).subscribe(() => {
      this.success.set(true);
      setTimeout(() => this.goBack(), 5000);
    });
  }

  /** איפוס כל השדות */
  protected resetForm(): void {
    this.form.reset();
    this.submitted.set(false);
  }

  /** חזרה לעמוד הקודם */
  protected goBack(): void {
    this.router.navigate(['/tickets']);
  }

  /** תנאי להצגת שגיאה */
  protected showError(
    controlName: keyof typeof this.form.controls
  ): boolean {
    const control = this.form.controls[controlName];
    return (
      control.invalid &&
      (control.dirty || control.touched || this.submitted())
    );
  }
}
