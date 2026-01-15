import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service';
import { FilterStatus, Ticket } from '../../models/ticket.model';
import { ErrorModalComponent } from '../../../../shared/components/error-modal.component/error-modal.component';

@Component({
  selector: 'app-main-tickets',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorModalComponent
  ],
  templateUrl: './main-tickets.component.html',
  styleUrl: './main-tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainTicketsComponent implements OnInit {

  private readonly ticketService = inject(TicketService);

  /** כל הפניות שקיבלנו מהשרת */
  private readonly allTickets = signal<Ticket[]>([]);

  /** פניות לתצוגה */
  public readonly tickets = signal<Ticket[]>([]);

  /** פילטר */
  public readonly filter = signal<FilterStatus>(FilterStatus.All);
  protected readonly FilterStatus = FilterStatus;

  /** שגיאה להצגת modal */
  public readonly error = signal<{ title: string; message: string; } | null>(null);

  ngOnInit(): void {
    this.loadTickets();
  }

  /** שליפת פניות */
  private loadTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: tickets => {
        this.allTickets.set(tickets);
        this.applyFilter();
      },
      error: () => {
        this.error.set({
          title: 'Failed to load tickets',
          message: 'Unable to retrieve tickets. Please try again later.'
        });
      }
    });
  }

  /** סגירת פנייה */
  public closeTicket(id: number): void {
    this.ticketService.closeTicket(id).subscribe({
      next: () => this.loadTickets(),
      error: () => {
        this.error.set({
          title: 'Failed to close ticket',
          message: 'The ticket could not be closed. Please try again.'
        });
      }
    });
  }

  /** שינוי פילטר */
  protected changeFilter(value: FilterStatus): void {
    this.filter.set(value);
    this.applyFilter();
  }

  /** החלת פילטר */
  protected applyFilter(): void {
    const filter = this.filter();
    const tickets = this.allTickets();

    switch (filter) {
      case FilterStatus.Open:
        this.tickets.set(tickets.filter(t => !t.isClosed));
        break;

      case FilterStatus.Closed:
        this.tickets.set(tickets.filter(t => t.isClosed));
        break;

      default:
        this.tickets.set(tickets);
    }
  }

  /** סגירת modal שגיאה */
  protected clearError(): void {
    this.error.set(null);
  }
}