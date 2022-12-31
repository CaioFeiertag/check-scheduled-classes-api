import { GetScheduledSubscriptionClassDuration } from "./../protocols/get-scheduled-classes-duration";
import { GetSubscriptionByUserId } from "./../protocols";
import { Request, Response } from "express";

export class HasScheduledClassesController {
	constructor(
		private readonly getSubscriptionByUserId: GetSubscriptionByUserId,
		private readonly getScheduledSubscriptionClassDuration: GetScheduledSubscriptionClassDuration
	) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const { userId } = request.params;

		const subscription = await this.getSubscriptionByUserId.get(userId);

		if (!subscription)
			return response.status(404).json({
				error: "Any activated Subscription have been found for user",
			});

		const scheduledDurationPerWeek =
			await this.getScheduledSubscriptionClassDuration.get(
				subscription.id
			);

		const hasScheduledAll =
			scheduledDurationPerWeek >= subscription.minutesPerWeek;

		return response.status(200).json({ data: { hasScheduledAll } });
	}
}
