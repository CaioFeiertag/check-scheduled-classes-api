import { GetScheduledSubscriptionClassDuration } from "./../../protocols/get-scheduled-classes-duration";
import { DataSource } from "typeorm";

export class DBGetScheduledSubscriptionClassDuration
	implements GetScheduledSubscriptionClassDuration
{
	constructor(private readonly dataSource: DataSource) {}

	async get(subscriptionId: string): Promise<number> {
		const response = await this.dataSource.query(`
			SELECT SUM(sct.duration) as totalDuration
			FROM subscription_class_time as sct
			LEFT OUTER JOIN subscription_class as sc ON sct.subscription_class_id = sc.id
			LEFT OUTER JOIN subscription_class_subscription as scs ON sc.id = scs.subscription_class_id
			WHERE scs.subscription_id = '${subscriptionId}'
			AND sc.active IS TRUE
		`);

		return response[0]?.totalDuration || 0;
	}
}
