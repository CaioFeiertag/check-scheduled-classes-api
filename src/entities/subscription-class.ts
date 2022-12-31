import { SubscriptionClassTime } from "./subscription-class-time";
import { Subscription } from "./subscription";

export interface SubscriptionClass {
  readonly id: string;
  readonly active: boolean;
  readonly subjectName: string;
  readonly times: ReadonlyArray<SubscriptionClassTime>;
  readonly subscriptions: ReadonlyArray<Subscription>;
}
