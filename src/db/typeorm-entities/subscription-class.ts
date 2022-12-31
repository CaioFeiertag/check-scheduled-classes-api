import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { SubscriptionClassTimeTypeOrm } from "./subscription-class-time";
import { SubscriptionTypeOrm } from "./subscription";

@Entity({ name: "subscription_class" })
export class SubscriptionClassTypeOrm {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("boolean")
  active: boolean;

  @OneToMany(() => SubscriptionClassTimeTypeOrm, (time) => time.class, {
    eager: true,
  })
  times: SubscriptionClassTimeTypeOrm[];

  @ManyToMany(() => SubscriptionTypeOrm, (sub) => sub.classes)
  subscriptions?: SubscriptionTypeOrm[];
}
