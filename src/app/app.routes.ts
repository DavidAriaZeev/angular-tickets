import { Routes } from '@angular/router';
import { MainTicketsComponent } from './features/tickets/components/main-tickets.component/main-tickets.component';
import { NewTicketComponent } from './features/tickets/components/new-ticket.component/new-ticket.component';

export const routes: Routes = [
  { path: 'tickets', component: MainTicketsComponent },
  { path: 'tickets/new', component: NewTicketComponent },
  { path: '', redirectTo: 'tickets', pathMatch: 'full' }
];