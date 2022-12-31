import { dataSource } from "~/factories/data-source-factory";
import { seedSubscriptionsRelated } from "./../../helpers/seed-subscriptions-related";
import { DBGetScheduledSubscriptionClassDuration } from "~/db/repositories/db-get-scheduled-classes-duration";
import { handleDBConnection } from "../../db-connection-helper";
import { createUser } from "../../helpers";

const makeSut = () => {
	const sut = new DBGetScheduledSubscriptionClassDuration(dataSource);

	return {
		sut,
	};
};

describe("DBGetScheduledSubscriptionClassDuration Integration Tests with DB", () => {
	handleDBConnection();

	beforeEach(seedSubscriptionsRelated);

	it("it should return 0 if subscription does not have any classes related", async () => {
		const { sut } = makeSut();

		const { subscription } = await seedSubscriptionsRelated({
			classes: { count: 0 },
		});

		const response = await sut.get(subscription.id);

		expect(response).toBe(0);
	});

	it("it should return 0 if the class related to subscription does not have times", async () => {
		const { sut } = makeSut();

		const { subscription } = await seedSubscriptionsRelated({
			classes: { count: 1 },
			times: { count: 0 },
		});

		const response = await sut.get(subscription.id);

		expect(response).toBe(0);
	});

	it("it should return 0 if the class of the subscription is not activated", async () => {
		const { sut } = makeSut();

		const user = await createUser();

		const { subscription } = await seedSubscriptionsRelated({
			classes: { count: 1, active: false },
			times: { count: 1 },
		});

		const response = await sut.get(subscription.id);

		expect(response).toBe(0);
	});

	it("it should return 45 if the time related to class of the subscription has a duration of 45", async () => {
		const { sut } = makeSut();

		const { subscription } = await seedSubscriptionsRelated({
			classes: { count: 1 },
			times: { count: 1, duration: 45 },
		});

		const response = await sut.get(subscription.id);

		expect(response).toBe(45);
	});

	it("it should return 90 if the two times related to class of the subscription has a duration of 45", async () => {
		const { sut } = makeSut();

		const { subscription } = await seedSubscriptionsRelated({
			classes: { count: 1 },
			times: { count: 2, duration: 45 },
		});

		const response = await sut.get(subscription.id);

		expect(response).toBe(90);
	});

	it("it should return 90 if the two times related to the two classes of the subscription has a duration of 45", async () => {
		const { sut } = makeSut();

		const { subscription } = await seedSubscriptionsRelated({
			classes: { count: 2 },
			times: { count: 1, duration: 45 },
		});

		const response = await sut.get(subscription.id);

		expect(response).toBe(90);
	});
});
