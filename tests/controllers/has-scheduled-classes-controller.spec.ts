import { HasScheduledClassesController } from "~/controllers/has-scheduled-classes-controller";
import { createRequest, createResponse } from "node-mocks-http";

const subcription = {
	id: "valid-subscription-id",
	minutesPerWeek: 90,
};

const makeSut = () => {
	const getSubscriptionByUserId = {
		get: jest.fn().mockResolvedValue(subcription),
	};
	const getScheduledSubscriptionClassDuration = {
		get: jest.fn().mockResolvedValue(0),
	};

	const stubs = {
		getSubscriptionByUserId,
		getScheduledSubscriptionClassDuration,
	};

	const sut = new HasScheduledClassesController(
		getSubscriptionByUserId,
		getScheduledSubscriptionClassDuration
	);

	return { sut, stubs };
};

const makeFakeRequest = (userId: string) => {
	return createRequest({
		method: "GET",
		url: `/users/${userId}/has-scheduled-all`,
		params: {
			userId,
		},
	});
};

const makeFakeResponse = () => {
	return createResponse();
};

describe("UserHasScheduledAllSubscriptionsClassesController Test", () => {
	it("should call get subscription", async () => {
		const { sut, stubs } = makeSut();

		await sut.handle(makeFakeRequest("valid-uuid"), makeFakeResponse());

		expect(stubs.getSubscriptionByUserId.get).toHaveBeenCalledWith(
			"valid-uuid"
		);
	});

	it("should call get scheduled total duration", async () => {
		const { sut, stubs } = makeSut();

		const subcription = {
			id: "valid-subscription-id",
		};

		jest.spyOn(stubs.getSubscriptionByUserId, "get").mockResolvedValueOnce(
			subcription
		);

		await sut.handle(makeFakeRequest("valid-uuid"), makeFakeResponse());

		expect(
			stubs.getScheduledSubscriptionClassDuration.get
		).toHaveBeenCalledWith(subcription.id);
	});

	it("should set status 404 and send not found message if any subscription has been found", async () => {
		const { sut, stubs } = makeSut();

		const response = makeFakeResponse();

		jest.spyOn(stubs.getSubscriptionByUserId, "get").mockResolvedValueOnce(
			null
		);
		const responseJsonSpy = jest.spyOn(response, "json");

		await sut.handle(makeFakeRequest("valid-uuid"), response);

		expect(response.statusCode).toBe(404);
		expect(responseJsonSpy).toHaveBeenCalledWith({
			error: "Any activated Subscription have been found for user",
		});
	});

	it("should set status 200 for success response", async () => {
		const { sut } = makeSut();

		const response = makeFakeResponse();

		await sut.handle(makeFakeRequest("valid-uuid"), response);

		expect(response.statusCode).toBe(200);
	});

	it("should return json data containing hasScheduledAll as false if totalDurationPerWeek from classes are less than what's defined on subscription", async () => {
		const { sut, stubs } = makeSut();

		const response = makeFakeResponse();

		jest.spyOn(
			stubs.getScheduledSubscriptionClassDuration,
			"get"
		).mockResolvedValueOnce(89);
		const responseJsonSpy = jest.spyOn(response, "json");

		await sut.handle(makeFakeRequest("valid-uuid"), response);

		expect(responseJsonSpy).toHaveBeenCalledWith({
			data: { hasScheduledAll: false },
		});
	});

	it("should return json data containing hasScheduledAll as true if totalDurationPerWeek from classes are equal to what's defined on subscription", async () => {
		const { sut, stubs } = makeSut();

		const response = makeFakeResponse();

		jest.spyOn(
			stubs.getScheduledSubscriptionClassDuration,
			"get"
		).mockResolvedValueOnce(90);
		const responseJsonSpy = jest.spyOn(response, "json");

		await sut.handle(makeFakeRequest("valid-uuid"), response);

		expect(responseJsonSpy).toHaveBeenCalledWith({
			data: { hasScheduledAll: true },
		});
	});

	it("should return json data containing hasScheduledAll as true if totalDurationPerWeek from classes are greater than what's defined on subscription", async () => {
		const { sut, stubs } = makeSut();

		const response = makeFakeResponse();

		jest.spyOn(
			stubs.getScheduledSubscriptionClassDuration,
			"get"
		).mockResolvedValueOnce(90);
		const responseJsonSpy = jest.spyOn(response, "json");

		await sut.handle(makeFakeRequest("valid-uuid"), response);

		expect(responseJsonSpy).toHaveBeenCalledWith({
			data: { hasScheduledAll: true },
		});
	});

	it("should not catch error if getScheduledSubscriptionClassDuration throws", async () => {
		const { sut, stubs } = makeSut();

		const error = new Error("any-error");

		jest.spyOn(
			stubs.getScheduledSubscriptionClassDuration,
			"get"
		).mockImplementationOnce(() => {
			throw error;
		});

		expect(
			sut.handle(makeFakeRequest("valid-uuid"), makeFakeResponse())
		).rejects.toThrow(error);
	});
});
