import { GetSubscriptionByUserId } from "./../../protocols/get-subscription-by-user-id";
import { DataSource } from "typeorm";
import { Subscription } from "~/entities";
import { SubscriptionTypeOrm } from "~/db/typeorm-entities/subscription";

export class DBGetSubscriptionByUserId implements GetSubscriptionByUserId {
	constructor(private readonly dataSource: DataSource) {}

	async get(userId: string): Promise<Subscription | null> {
		const repo = this.dataSource.getRepository(SubscriptionTypeOrm);

		const response = await repo.findOneBy({
			user: { id: userId },
			status: "active",
		});

		if (!response) return null;

		return {
			id: response.id,
			minutesPerWeek: response.minutesPerWeek,
			user: {
				id: response.user.id,
				name: response.user.name,
				email: response.user.email,
				createdAt: response.user.created_at,
				updatedAt: response.user.updated_at,
			},
			createdAt: response.created_at,
			updatedAt: response.updated_at,
			status: response.status,
		};
	}
}
