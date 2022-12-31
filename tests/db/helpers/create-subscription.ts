import { dataSource } from "~/factories/data-source-factory";
import { UserTypeOrm } from "~/db/typeorm-entities/user";
import { faker } from "@faker-js/faker";
import { SubscriptionTypeOrm } from "~/db/typeorm-entities/subscription";

interface PartialSubscription
	extends Partial<
		Omit<SubscriptionTypeOrm, "id" | "created_at" | "updated_at" | "user">
	> {
	user?: Partial<UserTypeOrm>;
}

export function createSubscription(
	partialSubscription: PartialSubscription = {}
) {
	return dataSource.getRepository(SubscriptionTypeOrm).save({
		minutesPerWeek: faker.datatype.number({ min: 1 }),
		status: "active",
		...partialSubscription,
	});
}
