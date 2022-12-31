import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	Generated,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { SubscriptionClassTime } from "~/entities";
import { SubscriptionClassTypeOrm } from "./subscription-class";

@Entity({ name: "subscription_class_time" })
export class SubscriptionClassTimeTypeOrm {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("time")
	start_time: string;

	@Column("int")
	weekday: SubscriptionClassTime["weekday"];

	/**
	 * Duration in minutes
	 */
	@Column("int")
	duration: number;

	@ManyToOne(() => SubscriptionClassTypeOrm, (subClass) => subClass.times, {
		cascade: true,
	})
	@JoinColumn({ name: "subscription_class_id" })
	class: SubscriptionClassTypeOrm;
}
