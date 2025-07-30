export type UserRole = 'manager' | 'handler' | 'trucker';

export type ShipmentStatus = 'Arrived' | 'Ready for Collection' | 'Collected' | 'Delayed';

export interface HAWB {
  id: string; // HAWB Number
  freightCompany: string;
  recipient: {
    name: string;
    address: string;
  };
  weightKg: number;
  pieces: number;
}

export interface AWB {
  id: string; // AWB Number
  origin: string;
  destination: string;
  arrivalDateTime: string; // ISO 8601 format
  status: ShipmentStatus;
  hawbs: HAWB[];
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  company?: string; // Relevant for truckers and managers
}
