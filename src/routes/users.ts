import { makeHasScheduledClassesController } from "~/factories/has-scheduled-classes-controller-factory";
import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

const hasScheduledClassesController = makeHasScheduledClassesController();

export const usersRouter = Router();

usersRouter.get(
	"/:userId/has-scheduled-classes",
	celebrate({
		[Segments.PARAMS]: { userId: Joi.string().uuid().required() },
	}),
	async (request, response, next) => {
		try {
			await hasScheduledClassesController.handle(request, response);
		} catch (error) {
			next(error);
		}
	}
);
