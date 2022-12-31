import { errorMiddleware } from "./middlewares/error-middleware";
import { usersRouter } from "~/routes/users";
import express, { NextFunction, Request } from "express";
import { config } from "~/config";
import { errors } from "celebrate";

export const initializeServer = () => {
	const app = express();

	app.use("/users", usersRouter);

	const server = app.listen(config.server.port, () => {
		console.log(`Server running on port ${config.server.port}`);
	});

	app.use(errors());
	app.use(errorMiddleware);

	return server;
};
