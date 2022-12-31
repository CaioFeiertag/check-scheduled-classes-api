import { User } from "./user";

export interface Subscription {
  readonly id: string;
  readonly user: User;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly status: Subscription.Status;
  readonly minutesPerWeek: number;
}

export namespace Subscription {
  export type Status = "active" | "expired" | "cancelled";
}
