import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TicketService } from '../../../../services/ticket.service';
import { NewTicketRequest, Ticket } from '../../models/ticket.model';

/**
 * קומפוננטה לניהול פניות
 * כוללת טופס פתיחת פנייה ורשימת פניות
 */
  @Component({
  selector: 'app-main-tickets.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main-tickets.component.html',
  standalone: true,
  styleUrl: './main-tickets.component.scss',
})
export class MainTicketsComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly ticketService = inject(TicketService);

  tickets: Ticket[] = [];

  /**
   * טופס ריאקטיבי לפתיחת פנייה
   */
  readonly ticketForm = this.fb.nonNullable.group({
    userId: [0, [Validators.required, Validators.min(1)]],
    subject: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadTickets();
  }

  /**
   * שליפת כל הפניות
   */
  private loadTickets(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  /**
   * שליחת פנייה חדשה
   */
  submit(): void {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const newTicket: NewTicketRequest = this.ticketForm.getRawValue();

    this.ticketService.addTicket(newTicket).subscribe(() => {
      this.ticketForm.reset({ userId: 0, subject: '', description: '' });
      this.loadTickets();
    });
  }

  /**
   * סגירת פנייה
   */
  closeTicket(id: number): void {
    this.ticketService.closeTicket(id).subscribe(() => {
      this.loadTickets();
    });
  }
}
