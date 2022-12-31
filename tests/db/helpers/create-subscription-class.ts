import { SubscriptionClassTypeOrm } from "~/db/typeorm-entities/subscription-class";
import { dataSource } from "~/factories/data-source-factory";
import { SubscriptionTypeOrm } from "~/db/typeorm-entities/subscription";

interface PartialSubscriptionClass
	extends Partial<Omit<SubscriptionClassTypeOrm, "id" | "subscriptions">> {
	subscriptions?: Partial<SubscriptionTypeOrm>[];
}

export function createSubscriptionClass(
	partialClass: PartialSubscriptionClass = {}
) {
	return dataSource.getRepository(SubscriptionClassTypeOrm).save({
		active: true,
		...partialClass,
	});
}
