import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../config";

const makeDataSource = () => {
	const getFilesFolder = () =>
		process.env.TS_NODE_DEV === undefined ? "dist" : "src";

	return new DataSource({
		type: config.db.type as "mysql" | "sqlite",
		host: config.db.host,
		port: config.db.port,
		username: config.db.username,
		password: config.db.password,
		database: config.db.database,
		synchronize: process.env.NODE_ENV === "test" ? true : false,
		logging: false,
		entities: [`${getFilesFolder()}/db/typeorm-entities/*{.ts,.js}`],
		migrations: [`${getFilesFolder()}/db/typeorm-migrations/*{.ts,.js}`],
		subscribers: [],
	});
};

export const dataSource = makeDataSource();
