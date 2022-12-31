import "../../src/config/setup-alias";
import { seedSubscriptionsRelated } from "./helpers/seed-subscriptions-related";
import { dataSource } from "~/factories/data-source-factory";

export async function seed() {
	await dataSource.initialize();

	const { user: user1 } = await seedSubscriptionsRelated({
		classes: { count: 0 },
	});
	console.log(`User(${user1.id}) created without classes`);

	const { user: user2 } = await seedSubscriptionsRelated({
		classes: { count: 1 },
		subscription: { minutesPerWeek: 90 },
		times: { count: 1, duration: 45 },
	});

	console.log(
		`User(${user2.id}) created related to one class with 45 minutes but still has 45 minutes left`
	);

	const { user: user3 } = await seedSubscriptionsRelated({
		classes: { count: 1 },
		subscription: { minutesPerWeek: 90 },
		times: { count: 2, duration: 45 },
	});

	console.log(
		`User(${user3.id}) created related to two classes with 45 minutes and has no minutes left`
	);

	dataSource.destroy();
}

seed();
