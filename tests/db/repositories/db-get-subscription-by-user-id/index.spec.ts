import { DBGetSubscriptionByUserId } from "~/db/repositories/db-get-subscription-by-user-id";
import { SubscriptionTypeOrm } from "~/db/typeorm-entities/subscription";
import { DataSource } from "typeorm";

const makeSut = () => {
  const repository = { findOneBy: jest.fn() };

  const stubs = {
    dataSource: {
      getRepository: jest.fn().mockImplementation(() => repository),
    } as unknown as DataSource,
    repository,
  };

  const sut = new DBGetSubscriptionByUserId(stubs.dataSource);

  return {
    sut,
    stubs,
  };
};

describe("DBGetSubscriptionByUserId Unit Tests", () => {
  it("should call getRepository", async () => {
    const { sut, stubs } = makeSut();

    await sut.get("some-user-id");

    expect(stubs.dataSource.getRepository).toBeCalledWith(SubscriptionTypeOrm);
  });

  it("should call findOneBy with user id received as parameter and active status", async () => {
    const { sut, stubs } = makeSut();

    const userId = "some-user-id";

    await sut.get(userId);

    expect(stubs.repository.findOneBy).toBeCalledWith({
      user: { id: userId },
      status: "active",
    });
  });

  it("should return null if find returns null", async () => {
    const { sut, stubs } = makeSut();

    stubs.repository.findOneBy.mockImplementationOnce(() => null);

    const response = await sut.get("some-user-id");

    expect(response).toBeNull();
  });

  it("should return Subscription Entity if find returns TyperOrm Object", async () => {
    const { sut, stubs } = makeSut();

    const typeOrmSubscription = {
      id: "some-id",
      minutesPerWeek: 10,
      status: "active",
      created_at: new Date(),
      updated_at: new Date(),
      user: {
        id: "some-user-id",
        name: "some-name",
        email: "some-email",
        created_at: new Date(),
        updated_at: new Date(),
      },
    };

    stubs.repository.findOneBy.mockImplementationOnce(
      () => typeOrmSubscription
    );

    const response = await sut.get("some-user-id");

    expect(response).toStrictEqual({
      id: typeOrmSubscription.id,
      minutesPerWeek: typeOrmSubscription.minutesPerWeek,
      status: typeOrmSubscription.status,
      createdAt: typeOrmSubscription.created_at,
      updatedAt: typeOrmSubscription.updated_at,
      user: {
        id: typeOrmSubscription.user.id,
        name: typeOrmSubscription.user.name,
        email: typeOrmSubscription.user.email,
        createdAt: typeOrmSubscription.user.created_at,
        updatedAt: typeOrmSubscription.user.updated_at,
      },
    });
  });
});
