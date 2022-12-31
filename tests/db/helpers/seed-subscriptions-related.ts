import { createSubscription } from "./create-subscription";
import { createSubscriptionClass } from "./create-subscription-class";
import { createSubscriptionClassTime } from "./create-subscription-class-time";
import { createUser } from "./create-user";

interface SeedSubscriptionsRelatedParams {
	times: {
		duration?: number;
		count?: number;
	};
	classes: {
		count?: number;
		active?: boolean;
	};
	subscription: {
		minutesPerWeek?: number;
	};
}

export const seedSubscriptionsRelated = async (
	params: Partial<SeedSubscriptionsRelatedParams> = {}
) => {
	const { classes, times } = params;

	const user = await createUser();
	const subscription = await createSubscription({
		user,
		minutesPerWeek: params.subscription?.minutesPerWeek ?? 90,
	});
	const numberOfClasses = classes?.count ?? 1;
	const numberOfTimes = times?.count ?? 1;

	for (let i = 0; i < numberOfClasses; i++) {
		const subClass = await createSubscriptionClass({
			subscriptions: [subscription],
			active: classes?.active ?? true,
		});

		for (let j = 0; j < numberOfTimes; j++) {
			await createSubscriptionClassTime({
				class: subClass,
				duration: times?.duration ?? 45,
			});
		}
	}

	return { subscription, user };
};
