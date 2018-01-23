import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1516737431868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "passenger" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "flight" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "departureAirportId" integer, "arrivalAirportId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "airport" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "flight_has_passengers" ("passengerId" integer NOT NULL, "flightId" integer NOT NULL, PRIMARY KEY("passengerId", "flightId"))`);
        await queryRunner.query(`CREATE INDEX "ind_56aef50df9ebe1171912b7ff57" ON "flight_has_passengers"("passengerId")`);
        await queryRunner.query(`CREATE INDEX "ind_82b36a82f0483037592e04fc2d" ON "flight_has_passengers"("flightId")`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "fk_bd7bf99f777fc702b71884dd86f" FOREIGN KEY ("departureAirportId") REFERENCES "airport"("id")`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "fk_b422600e128e4a413791cfbbad6" FOREIGN KEY ("arrivalAirportId") REFERENCES "airport"("id")`);
        await queryRunner.query(`ALTER TABLE "flight_has_passengers" ADD CONSTRAINT "fk_133c38fb123c5ff3dc53de7346c" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id")`);
        await queryRunner.query(`ALTER TABLE "flight_has_passengers" ADD CONSTRAINT "fk_4f003c9b3e8d85e6b4b4719ff68" FOREIGN KEY ("flightId") REFERENCES "flight"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "flight_has_passengers" DROP CONSTRAINT "fk_4f003c9b3e8d85e6b4b4719ff68"`);
        await queryRunner.query(`ALTER TABLE "flight_has_passengers" DROP CONSTRAINT "fk_133c38fb123c5ff3dc53de7346c"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "fk_b422600e128e4a413791cfbbad6"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "fk_bd7bf99f777fc702b71884dd86f"`);
        await queryRunner.query(`-- TODO: revert CREATE INDEX "ind_82b36a82f0483037592e04fc2d" ON "flight_has_passengers"("flightId")`);
        await queryRunner.query(`-- TODO: revert CREATE INDEX "ind_56aef50df9ebe1171912b7ff57" ON "flight_has_passengers"("passengerId")`);
        await queryRunner.query(`DROP TABLE "flight_has_passengers"`);
        await queryRunner.query(`DROP TABLE "airport"`);
        await queryRunner.query(`DROP TABLE "flight"`);
        await queryRunner.query(`DROP TABLE "passenger"`);
    }

}
