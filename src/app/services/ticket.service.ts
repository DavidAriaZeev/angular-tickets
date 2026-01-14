import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewTicketRequest, Ticket } from '../features/tickets/models/ticket.model';
import { AppConfigService } from '../core/config/app-config.service';

/**
 * שירות לניהול פניות (Tickets)
 * אחראי על תקשורת עם ה-API
 */
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly http = inject(HttpClient);
  private readonly configService = inject(AppConfigService);
  private readonly apiUrl: string = `${this.configService.configuration.apiBaseUrl}/tickets`;

  /** שליפת כל הפניות */
  public getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  /** יצירת פנייה חדשה */
  public addTicket(ticket: NewTicketRequest): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  /** סגירת פנייה לפי מזהה */
  public closeTicket(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/close`, {});
  }
}
