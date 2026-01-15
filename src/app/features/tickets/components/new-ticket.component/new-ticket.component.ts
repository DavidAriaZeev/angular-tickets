import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service';
import { NewTicketRequest } from '../../models/ticket.model';
import { IDValidator } from '../../../../shared/Validators';
import { UtilsService } from '../../../../core/services/utils.service';
import { ErrorModalComponent } from '../../../../shared/components/error-modal.component/error-modal.component';

@Component({
  standalone: true,
  selector: 'app-new-ticket',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ErrorModalComponent],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTicketComponent implements OnDestroy {

  private readonly fb = inject(FormBuilder);
  private readonly utils = inject(UtilsService);
  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);

  /** מצב הצלחה */
  public readonly success = signal(false);

  /** האם ניסו לשלוח */
  public readonly submitted = signal(false);

  /** Countdown לניווט אוטומטי */
  public readonly countdown = signal(5);

  /** שגיאה להצגת modal */
  public readonly error = signal<{
    title: string;
    message: string;
  } | null>(null);

  /** מזהה הטיימר */
  private countdownTimer?: number;

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

  /** שליחת פנייה */
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
    };

    this.ticketService.addTicket(objToSend).subscribe({
      next: () => {
        this.success.set(true);
        this.startCountdown();
      },
      error: () => {
        this.error.set({
          title: 'Submission failed',
          message: 'The ticket could not be submitted. Please try again later.'
        });
      }
    });

  }

  /** התחלת Countdown */
  private startCountdown(): void {
    this.countdown.set(5);

    this.countdownTimer = window.setInterval(() => {
      const value = this.countdown();

      if (value <= 1) {
        this.clearCountdown();
        this.goBack();
      } else {
        this.countdown.set(value - 1);
      }
    }, 1000);
  }

  /** ניקוי Countdown */
  private clearCountdown(): void {
    if (this.countdownTimer !== undefined) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = undefined;
    }
  }

  /** איפוס כל השדות */
  protected resetForm(): void {
    this.form.reset();
    this.submitted.set(false);
  }

  /** חזרה לרשימת פניות */
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

  /** ניקוי משאבים בעת השמדת הקומפוננטה */
  ngOnDestroy(): void {
    this.clearCountdown();
  }
}
