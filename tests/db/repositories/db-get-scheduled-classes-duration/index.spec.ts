import { DBGetSubscriptionByUserId } from "~/db/repositories/db-get-subscription-by-user-id";
import { SubscriptionTypeOrm } from "~/db/typeorm-entities/subscription";
import { DataSource } from "typeorm";
import { DBGetScheduledSubscriptionClassDuration } from "~/db/repositories/db-get-scheduled-classes-duration";

const makeSut = () => {
	const stubs = {
		dataSource: {
			query: jest.fn().mockResolvedValue([]),
		} as unknown as DataSource,
	};

	const sut = new DBGetScheduledSubscriptionClassDuration(stubs.dataSource);

	return {
		sut,
		stubs,
	};
};

describe("DBGetScheduledSubscriptionClassDuration Unit Tests", () => {
	it("should call query with the raw sql that contains injected subscription id", async () => {
		const { sut, stubs } = makeSut();

		await sut.get("some-user-id");

		expect(stubs.dataSource.query).toBeCalledWith(`
			SELECT SUM(sct.duration) as totalDuration
			FROM subscription_class_time as sct
			LEFT OUTER JOIN subscription_class as sc ON sct.subscription_class_id = sc.id
			LEFT OUTER JOIN subscription_class_subscription as scs ON sc.id = scs.subscription_class_id
			WHERE scs.subscription_id = 'some-user-id'
			AND sc.active IS TRUE
		`);
	});

	it("should return 0 if totalDuration was not defined", async () => {
		const { sut, stubs } = makeSut();

		const userId = "some-user-id";

		const response = await sut.get(userId);

		expect(response).toBe(0);
	});

	it("should return the totalDuration retireved from query", async () => {
		const { sut, stubs } = makeSut();

		const querySpy = jest.spyOn(stubs.dataSource, "query");
		querySpy.mockResolvedValueOnce([
			{
				totalDuration: 45,
			},
		]);

		const response = await sut.get("some-user-id");

		expect(response).toBe(45);
	});
});
