import "./setup-env";

export const config = {
	db: {
		type: process.env.DB_TYPE || "mysql",
		host: process.env.DB_HOST || "mysql",
		port: Number(process.env.DB_PORT) || 3306,
		username: process.env.DB_USERNAME || "admin",
		password: process.env.DB_PASSWORD || "secret",
		database: process.env.DB_DATABASE || "subscription_db",
	},
	server: {
		port: Number(process.env.SERVER_PORT) || 3000,
	},
};
