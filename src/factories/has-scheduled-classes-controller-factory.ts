import { HasScheduledClassesController } from "~/controllers/has-scheduled-classes-controller";
import { DBGetSubscriptionByUserId } from "~/db/repositories/db-get-subscription-by-user-id";
import { dataSource } from "./data-source-factory";
import { DBGetScheduledSubscriptionClassDuration } from "~/db/repositories/db-get-scheduled-classes-duration";

export const makeHasScheduledClassesController = () => {
	const getSubscription = new DBGetSubscriptionByUserId(dataSource);
	const getScheduledClassesDuration =
		new DBGetScheduledSubscriptionClassDuration(dataSource);

	return new HasScheduledClassesController(
		getSubscription,
		getScheduledClassesDuration
	);
};
