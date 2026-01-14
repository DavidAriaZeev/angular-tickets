import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../../../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-tickets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './main-tickets.component.html',
  styleUrl: './main-tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainTicketsComponent implements OnInit {

  private readonly ticketService = inject(TicketService);

  /** רשימת פניות */
  public readonly tickets = signal<Ticket[]>([]);

  ngOnInit(): void {
    this.loadTickets();
  }

  /** יבוא של הפניות הקיימות */
  private loadTickets(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets.set(tickets);
    });
  }

  /** "הפוך פניה ל"סגורה */
  public closeTicket(id: number): void {
    this.ticketService.closeTicket(id).subscribe(() => {
      this.loadTickets();
    });
  }
}
