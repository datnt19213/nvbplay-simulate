export interface OutOfStockEvent {
  eventType: string;
  data: Array<{
    id: string;
    availability: number;
  }>;
  timestamp: string;
}
