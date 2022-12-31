import { User, Subscription } from "~/entities";

export interface GetSubscriptionByUserId {
  get(
    userUuid: GetSubscriptionByUserId.Params
  ): Promise<GetSubscriptionByUserId.Result>;
}

export namespace GetSubscriptionByUserId {
  export type Params = string;

  export type Result = Subscription | null;
}
