import { mockAwbs, mockUsers, simulateStatusChange as mockSimulateStatusChange } from "./mockData";
import type { AWB, User } from "@/types";

// Simulate network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches Air Way Bills based on user role.
 * - Managers/Handlers see all.
 * - Truckers see only AWBs relevant to their company.
 * In a real app, this logic would be on the backend.
 */
export const fetchAwbs = async (user: User): Promise<AWB[]> => {
  console.log(`Fetching AWBs for user: ${user.name} (${user.role})`);
  await sleep(500);

  if (user.role === 'manager' || user.role === 'handler') {
    return Promise.resolve(mockAwbs);
  }

  if (user.role === 'trucker') {
    const truckerCompany = user.company;
    if (!truckerCompany) {
      return Promise.resolve([]); // Trucker with no company sees nothing
    }
    const filteredAwbs = mockAwbs.filter(awb =>
      awb.hawbs.some(hawb => hawb.freightCompany === truckerCompany)
    );
    // Also, let's make sure the trucker can see the HAWBs that are relevant to them, even if other HAWBs are on the same AWB
    const result = filteredAwbs.map(awb => ({
      ...awb,
      hawbs: awb.hawbs.filter(hawb => hawb.freightCompany === truckerCompany)
    }));
    return Promise.resolve(result);
  }

  return Promise.resolve([]); // Default to empty array if role is unknown
};

/**
 * Fetches a single Air Way Bill by its ID.
 * In a real app, this would be a GET request to /api/awbs/:id.
 */
export const fetchAwbById = async (id: string): Promise<AWB | undefined> => {
  console.log(`Fetching AWB with id: ${id}...`);
  await sleep(500);
  return Promise.resolve(mockAwbs.find(awb => awb.id === id));
};

/**
 * Simulates a user login.
 * In a real app, this would be a POST request to /api/login.
 */
export const login = async (email: string): Promise<User | undefined> => {
  console.log(`Attempting login for email: ${email}...`);
  await sleep(1000);
  // Simple mock: just return a user based on a keyword in the email
  if (email.includes('manager')) return Promise.resolve(mockUsers[0]);
  if (email.includes('handler')) return Promise.resolve(mockUsers[1]);
  if (email.includes('trucker')) return Promise.resolve(mockUsers[2]);
  return Promise.resolve(undefined);
};

/**
 * Simulates a backend process that randomly changes an AWB's status.
 */
export const simulateStatusChange = () => {
  // In a real app, this would be a backend-initiated event.
  // Here, we just call the mock data function.
  mockSimulateStatusChange();
};
