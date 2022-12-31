import { SubscriptionClassTypeOrm } from "~/db/typeorm-entities/subscription-class";
import { dataSource } from "~/factories/data-source-factory";
import { SubscriptionClassTimeTypeOrm } from "~/db/typeorm-entities/subscription-class-time";
import { faker } from "@faker-js/faker";
import format from "date-fns/format";
import { SubscriptionClassTime } from "~/entities";

interface PartialSubscriptionClassTime
	extends Partial<Omit<SubscriptionClassTimeTypeOrm, "id" | "class">> {
	class?: Partial<SubscriptionClassTypeOrm>;
}

export function createSubscriptionClassTime(
	partialClass: PartialSubscriptionClassTime = {}
) {
	return dataSource.getRepository(SubscriptionClassTimeTypeOrm).save({
		start_time: format(faker.date.future(), "HH:mm"),
		active: faker.datatype.boolean(),
		weekday: faker.datatype.number({
			min: 0,
			max: 6,
		}) as SubscriptionClassTime["weekday"],
		duration: faker.datatype.number({ min: 1 }),
		...partialClass,
	});
}
