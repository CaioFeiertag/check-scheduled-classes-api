import { dataSource } from "~/factories/data-source-factory";

const callbacks = {
	beforeAll: () => beforeAll(() => dataSource.initialize()),
	afterEach: () =>
		afterEach(async () => {
			const entities = dataSource.entityMetadatas;

			dataSource.query("PRAGMA foreign_keys = OFF;");

			const promises = entities.map((entity) => {
				const repository = dataSource.getRepository(entity.name);
				return repository.clear();
			});

			await Promise.all(promises);

			dataSource.query("PRAGMA foreign_keys = ON;");
		}),
	afterAll: () => afterAll(() => dataSource.destroy()),
};

export const handleDBConnection = Object.assign(() => {
	callbacks.beforeAll();
	callbacks.afterEach();
	callbacks.afterAll();
}, callbacks);
