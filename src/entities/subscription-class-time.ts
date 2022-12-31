import { SubscriptionClass } from "./subscription-class";

/**
 * A weekday time that a class occurs, a class can have multiple times
 */
export interface SubscriptionClassTime {
  readonly id: string;

  /**
   * The Weekday that the class occurs
   *
   * 0 - Sunday
   * 1 - Monday
   * 2 - Tuesday
   * 3 - Wednesday
   * 4 - Thursday
   * 5 - Friday
   * 6 - Saturday
   */
  readonly weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The start time in [hh:mm] format
   */
  readonly startTime: string;

  /**
   * Duration in minutes
   */
  readonly duration: number;

  readonly class: SubscriptionClass;
}
