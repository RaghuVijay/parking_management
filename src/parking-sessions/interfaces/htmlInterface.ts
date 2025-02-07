export interface ParkingSessionInput {
  name: string; // Mall name
  invoice: string; // Check-in session ID
  date: string; // Formatted date string
  VEH_NUM: string; // Vehicle registration number
  entryTime: string | Date; // Entry timestamp
  exitTime: string | Date; // Exit timestamp
  duration: number; // Duration in minutes
  totalamount: number; // Total cost
  mallAddress: string; // Mall address
  levelCode: string;
}
