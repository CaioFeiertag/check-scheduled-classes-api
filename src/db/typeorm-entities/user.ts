import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { SubscriptionTypeOrm } from "./subscription";

@Entity({ name: "user" })
export class UserTypeOrm {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar", { nullable: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => SubscriptionTypeOrm, (subscription) => subscription.user, {
    eager: false,
  })
  subscriptions: SubscriptionTypeOrm[];
}
