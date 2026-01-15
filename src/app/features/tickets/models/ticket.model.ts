export interface Ticket {
  ticketId: number;
  userId: number;
  subject: string;
  description: string;
  isClosed: boolean;
}

/**
 * מודל לפנייה חדשה (כפי שנשלחת לשרת)
 */
export interface NewTicketRequest {
  userId: number;
  subject: string;
  description: string;
}

export enum FilterStatus {
  All = 1,
  Open = 2,
  Closed = 3,
}