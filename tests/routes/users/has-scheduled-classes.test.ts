import request from "supertest";
import { seedSubscriptionsRelated } from "./../../db/helpers";
import { handleDBConnection } from "./../../db/db-connection-helper";
import { app } from "./../../../src";
import { createUser } from "../../db/helpers/create-user";
import { dataSource } from "~/factories/data-source-factory";

const makeRequest = async (
	userId: string,
	expectedStatus: number,
	expectedData?: Record<string, any>
) => {
	const requestBuild = request(await app).get(
		`/users/${userId}/has-scheduled-classes`
	);
	if (expectedData) {
		return requestBuild.expect(expectedStatus, expectedData);
	}
	return requestBuild.expect(expectedStatus);
};

describe("GET users/:userId/has-scheduled-classes test", () => {
	handleDBConnection.afterEach();

	handleDBConnection.afterAll();
	beforeAll(async () => {
		await app;
	});
	afterAll(async () => {
		const awaitedApp = (await app).close();
	});

	test("Should return 404 if an user does not have a subcription", async () => {
		const user = await createUser();
		await makeRequest(user.id, 404, {
			error: "Any activated Subscription have been found for user",
		});
	});

	test("Should return 200 and hasScheduledAll as False if there is any classes related", async () => {
		const { user } = await seedSubscriptionsRelated({
			classes: { count: 0 },
		});

		await makeRequest(user.id, 200, {
			data: { hasScheduledAll: false },
		});
	});

	test("Should return 200 and hasScheduledAll as False if minutesPerWeek from subscription is 90 and only one class with duration of 45 minutes is scheduled", async () => {
		const { user } = await seedSubscriptionsRelated({
			classes: { count: 1 },
			subscription: { minutesPerWeek: 90 },
			times: { count: 1, duration: 45 },
		});

		await makeRequest(user.id, 200, {
			data: { hasScheduledAll: false },
		});
	});

	test("Should return 200 and hasScheduledAll as True if minutesPerWeek from subscription is 90 and has two classes with duration of 45 minutes", async () => {
		const { user } = await seedSubscriptionsRelated({
			classes: { count: 1 },
			subscription: { minutesPerWeek: 90 },
			times: { count: 2, duration: 45 },
		});

		await makeRequest(user.id, 200, {
			data: { hasScheduledAll: true },
		});
	});

	test("Should return Bad Request if user id is not an uuid", async () => {
		const request = await makeRequest("not-valid-uuid", 400);

		expect(request.body).toMatchObject({
			message: "Validation failed",
		});
	});

	test("Should return Internal Server Error if db query thorws an error", async () => {
		const { user } = await seedSubscriptionsRelated();

		const querySpy = jest.spyOn(dataSource, "query");

		querySpy.mockImplementationOnce(async () => {
			throw new Error("Error");
		});

		const request = await makeRequest(user.id, 500);

		expect(request.body).toMatchObject({
			message: "Error",
		});
	});
});
