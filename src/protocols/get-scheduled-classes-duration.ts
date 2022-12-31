import { Subscription } from "~/entities";

export interface GetScheduledSubscriptionClassDuration {
  get(
    subscriptionId: GetScheduledSubscriptionClassDuration.Params
  ): Promise<GetScheduledSubscriptionClassDuration.Result>;
}

export namespace GetScheduledSubscriptionClassDuration {
  export type Params = string;

  export type Result = number;
}
