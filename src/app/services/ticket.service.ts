import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NewTicketRequest, Ticket } from '../features/tickets/models/ticket.model';
import { AppConfigService } from '../core/config/app-config.service';
import { SpinnerService } from '../core/spinner/spinner.service';

/**
 * TicketService
 * Responsible for communicating with the Tickets API
 */
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly spinner = inject(SpinnerService);
  private readonly configService = inject(AppConfigService);
  private readonly apiUrl = `${this.configService.configuration.apiBaseUrl}`;

  /** Get all tickets */
  public getTickets(): Observable<Ticket[]> {
    this.spinner.show();

    return this.http.get<Ticket[]>(`${this.apiUrl}/tickets`).pipe(
      finalize(() => this.spinner.hide())
    );
  }

  /** Create a new ticket */
  public addTicket(
    ticket: NewTicketRequest): Observable<Ticket> {
    this.spinner.show();

    return this.http.post<Ticket>(`${this.apiUrl}/createTicket`, ticket).pipe(
      finalize(() => this.spinner.hide())
    );
  }

  /** Close an existing ticket */
  public closeTicket(id: number): Observable<void> {
    this.spinner.show();

    return this.http.put<void>(`${this.apiUrl}/updateTicket/${id}`, {}).pipe(
      finalize(() => this.spinner.hide())
    );
  }
}