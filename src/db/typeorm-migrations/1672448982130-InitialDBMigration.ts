import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDBMigration1672448982130 implements MigrationInterface {
	name = "InitialDBMigration1672448982130";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`subscription\` (\`id\` varchar(36) NOT NULL, \`minutesPerWeek\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status\` varchar(255) NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`subscription_class\` (\`id\` varchar(36) NOT NULL, \`active\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`subscription_class_time\` (\`id\` varchar(36) NOT NULL, \`start_time\` time NOT NULL, \`weekday\` int NOT NULL, \`duration\` int NOT NULL, \`subscription_class_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`subscription_class_subscription\` (\`subscription_id\` varchar(36) NOT NULL, \`subscription_class_id\` varchar(36) NOT NULL, INDEX \`IDX_74bd3aec54c346ef32d943f56c\` (\`subscription_id\`), INDEX \`IDX_5ae9fbb8a0858f242d1cc54c9e\` (\`subscription_class_id\`), PRIMARY KEY (\`subscription_id\`, \`subscription_class_id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_940d49a105d50bbd616be540013\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE \`subscription_class_time\` ADD CONSTRAINT \`FK_b666e6d939a1dff5720b0798b43\` FOREIGN KEY (\`subscription_class_id\`) REFERENCES \`subscription_class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE \`subscription_class_subscription\` ADD CONSTRAINT \`FK_74bd3aec54c346ef32d943f56cd\` FOREIGN KEY (\`subscription_id\`) REFERENCES \`subscription\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE \`subscription_class_subscription\` ADD CONSTRAINT \`FK_5ae9fbb8a0858f242d1cc54c9e3\` FOREIGN KEY (\`subscription_class_id\`) REFERENCES \`subscription_class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`subscription_class_subscription\` DROP FOREIGN KEY \`FK_5ae9fbb8a0858f242d1cc54c9e3\``
		);
		await queryRunner.query(
			`ALTER TABLE \`subscription_class_subscription\` DROP FOREIGN KEY \`FK_74bd3aec54c346ef32d943f56cd\``
		);
		await queryRunner.query(
			`ALTER TABLE \`subscription_class_time\` DROP FOREIGN KEY \`FK_b666e6d939a1dff5720b0798b43\``
		);
		await queryRunner.query(
			`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_940d49a105d50bbd616be540013\``
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_5ae9fbb8a0858f242d1cc54c9e\` ON \`subscription_class_subscription\``
		);
		await queryRunner.query(
			`DROP INDEX \`IDX_74bd3aec54c346ef32d943f56c\` ON \`subscription_class_subscription\``
		);
		await queryRunner.query(
			`DROP TABLE \`subscription_class_subscription\``
		);
		await queryRunner.query(`DROP TABLE \`subscription_class_time\``);
		await queryRunner.query(`DROP TABLE \`subscription_class\``);
		await queryRunner.query(`DROP TABLE \`subscription\``);
		await queryRunner.query(`DROP TABLE \`user\``);
	}
}
