import { dataSource } from "~/factories/data-source-factory";
import { UserTypeOrm } from "~/db/typeorm-entities/user";
import { faker } from "@faker-js/faker";

type PartialUser = Partial<
	Omit<UserTypeOrm, "id" | "created_at" | "updated_at">
>;

export function createUser(partialUser: PartialUser = {}) {
	return dataSource.getRepository(UserTypeOrm).save({
		name: faker.name.fullName(),
		email: faker.internet.email(),
		...partialUser,
	});
}
