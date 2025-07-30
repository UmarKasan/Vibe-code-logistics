import type { AWB, User, ShipmentStatus } from "@/types";

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Alice Manager', role: 'manager', company: 'FreightCo A' },
  { id: 'user-2', name: 'Bob Handler', role: 'handler' },
  { id: 'user-3', name: 'Charlie Trucker', role: 'trucker', company: 'FreightCo A' },
  { id: 'user-4', name: 'Diana Trucker', role: 'trucker', company: 'Logistics B' },
];

export let mockAwbs: AWB[] = [
  {
    id: '123-45678901',
    origin: 'HKG',
    destination: 'SIN',
    arrivalDateTime: new Date().toISOString(),
    status: 'Arrived',
    hawbs: [
      {
        id: 'HAWB001',
        freightCompany: 'FreightCo A',
        recipient: { name: 'TechCorp', address: '123 Tech Park' },
        weightKg: 500,
        pieces: 10,
      },
      {
        id: 'HAWB002',
        freightCompany: 'Logistics B',
        recipient: { name: 'Gadget Inc.', address: '456 Gadget Avenue' },
        weightKg: 300,
        pieces: 5,
      },
    ],
  },
  {
    id: '123-45678902',
    origin: 'JFK',
    destination: 'SIN',
    arrivalDateTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Arrived 2 hours ago
    status: 'Ready for Collection',
    hawbs: [
      {
        id: 'HAWB003',
        freightCompany: 'FreightCo A',
        recipient: { name: 'Innovate LLC', address: '789 Innovation Drive' },
        weightKg: 1200,
        pieces: 25,
      },
    ],
  },
  {
    id: '123-45678903',
    origin: 'LHR',
    destination: 'SIN',
    arrivalDateTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Arrived yesterday
    status: 'Collected',
    hawbs: [
      {
        id: 'HAWB004',
        freightCompany: 'Logistics B',
        recipient: { name: 'Global Exports', address: '101 Global Way' },
        weightKg: 800,
        pieces: 15,
      },
    ],
  },
];

// Function to simulate real-time status updates
export const simulateStatusChange = () => {
  const statuses: ShipmentStatus[] = ['Arrived', 'Ready for Collection', 'Collected', 'Delayed'];
  const awbToUpdateIndex = Math.floor(Math.random() * mockAwbs.length);
  const newStatus = statuses[Math.floor(Math.random() * statuses.length)];

  // To make it more realistic, let's not change it to the same status
  if (mockAwbs[awbToUpdateIndex].status !== newStatus) {
    console.log(`Simulating status change for AWB ${mockAwbs[awbToUpdateIndex].id} to ${newStatus}`);
    mockAwbs[awbToUpdateIndex] = { ...mockAwbs[awbToUpdateIndex], status: newStatus };
  }
};
