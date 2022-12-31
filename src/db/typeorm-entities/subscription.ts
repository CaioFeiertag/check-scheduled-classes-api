import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Generated,
  ManyToOne,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Subscription } from "~/entities";
import { UserTypeOrm } from "./user";
import { SubscriptionClassTypeOrm } from "./subscription-class";

@Entity({ name: "subscription" })
export class SubscriptionTypeOrm {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  minutesPerWeek: number;

  @ManyToOne(() => UserTypeOrm, (user) => user.id, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  user: UserTypeOrm;

  @ManyToMany(
    () => SubscriptionClassTypeOrm,
    (subClassSub) => subClassSub.subscriptions,
    { cascade: true }
  )
  @JoinTable({
    name: "subscription_class_subscription",
    joinColumn: { name: "subscription_id" },
    inverseJoinColumn: { name: "subscription_class_id" },
  })
  classes: SubscriptionClassTypeOrm[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column("varchar")
  status: Subscription.Status;
}
