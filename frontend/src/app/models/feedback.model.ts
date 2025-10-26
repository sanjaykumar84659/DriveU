import { Driver } from "./driver.model";
import { User } from "./user.model";

export interface Feedback {
    feedbackId?: number;
    feedbackText: string;
    date: Date;
    // user: { userId: number };
    // driver?: { driverId: number } | null;
    category: string;
    rating: number;

   user?: Partial<User>;   // <-- allows only some fields like userId
  driver?: Partial<Driver>;
    
  }