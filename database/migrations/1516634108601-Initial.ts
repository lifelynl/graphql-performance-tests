import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1516634108601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "passenger" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "flight" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "sourceAirportId" integer, "destinationAirportId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "airport" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "flight_has_passengers" ("flightId" integer NOT NULL, "passengerId" integer NOT NULL, PRIMARY KEY("flightId", "passengerId"))`);
        await queryRunner.query(`CREATE INDEX "ind_82b36a82f0483037592e04fc2d" ON "flight_has_passengers"("flightId")`);
        await queryRunner.query(`CREATE INDEX "ind_56aef50df9ebe1171912b7ff57" ON "flight_has_passengers"("passengerId")`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "fk_928e6705340af48019ceb3b5414" FOREIGN KEY ("sourceAirportId") REFERENCES "airport"("id")`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "fk_8536d112a59ce85f5d7a6bd1efe" FOREIGN KEY ("destinationAirportId") REFERENCES "airport"("id")`);
        await queryRunner.query(`ALTER TABLE "flight_has_passengers" ADD CONSTRAINT "fk_4f003c9b3e8d85e6b4b4719ff68" FOREIGN KEY ("flightId") REFERENCES "flight"("id")`);
        await queryRunner.query(`ALTER TABLE "flight_has_passengers" ADD CONSTRAINT "fk_133c38fb123c5ff3dc53de7346c" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "flight_has_passengers" DROP CONSTRAINT "fk_133c38fb123c5ff3dc53de7346c"`);
        await queryRunner.query(`ALTER TABLE "flight_has_passengers" DROP CONSTRAINT "fk_4f003c9b3e8d85e6b4b4719ff68"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "fk_8536d112a59ce85f5d7a6bd1efe"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "fk_928e6705340af48019ceb3b5414"`);
        await queryRunner.query(`-- TODO: revert CREATE INDEX "ind_56aef50df9ebe1171912b7ff57" ON "flight_has_passengers"("passengerId")`);
        await queryRunner.query(`-- TODO: revert CREATE INDEX "ind_82b36a82f0483037592e04fc2d" ON "flight_has_passengers"("flightId")`);
        await queryRunner.query(`DROP TABLE "flight_has_passengers"`);
        await queryRunner.query(`DROP TABLE "airport"`);
        await queryRunner.query(`DROP TABLE "flight"`);
        await queryRunner.query(`DROP TABLE "passenger"`);
    }

}
