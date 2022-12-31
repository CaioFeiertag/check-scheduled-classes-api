import { DBGetSubscriptionByUserId } from "~/db/repositories/db-get-subscription-by-user-id";
import { handleDBConnection } from "./../../db-connection-helper";
import { createUser, createSubscription } from "../../helpers";
import { dataSource } from "~/factories/data-source-factory";

const makeSut = () => {
	const sut = new DBGetSubscriptionByUserId(dataSource);

	return {
		sut,
	};
};

const populateDatabase = async () => {
	const someUser = await createUser();
	await createSubscription({
		user: someUser,
	});
};

describe("db-get-scheduled-classes-duration Integration Tests with DB", () => {
	handleDBConnection();

	beforeEach(populateDatabase);

	it("should return null if user does not have subscription", async () => {
		const { sut } = makeSut();

		const user = await createUser();

		const response = await sut.get(user.id);

		expect(response).toBeNull();
	});

	it("should return null if the user subscription is cancelled", async () => {
		const { sut } = makeSut();

		const user = await createUser();
		await createSubscription({
			status: "cancelled",
			user,
		});

		const response = await sut.get(user.id);

		expect(response).toBeNull();
	});

	it("should return user activated subscription", async () => {
		const { sut } = makeSut();

		const user = await createUser();
		const subscription = await createSubscription({
			user,
		});

		const response = await sut.get(user.id);

		expect(response).toMatchObject({ id: subscription.id });
	});
});
