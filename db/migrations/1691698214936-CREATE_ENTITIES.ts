import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATEENTITIES1691698214936 implements MigrationInterface {
    name = 'CREATEENTITIES1691698214936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums-favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" uuid NOT NULL, CONSTRAINT "REL_da45d0b5e81bfdf2700bf40d1f" UNIQUE ("albumId"), CONSTRAINT "PK_57e180b6dc2f6665bf0d6910248" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists-favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" uuid NOT NULL, CONSTRAINT "REL_7346a9a994645b9b33695bd36c" UNIQUE ("artistId"), CONSTRAINT "PK_8a6e46e1864fc72ac7fa3b354b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks-favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trackId" uuid NOT NULL, CONSTRAINT "REL_2ccdc7807c4b0e4c24e3986e50" UNIQUE ("trackId"), CONSTRAINT "PK_48e36376108e765122b145436a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "albums-favorites" ADD CONSTRAINT "FK_da45d0b5e81bfdf2700bf40d1f1" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artists-favorites" ADD CONSTRAINT "FK_7346a9a994645b9b33695bd36c2" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks-favorites" ADD CONSTRAINT "FK_2ccdc7807c4b0e4c24e3986e50c" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks-favorites" DROP CONSTRAINT "FK_2ccdc7807c4b0e4c24e3986e50c"`);
        await queryRunner.query(`ALTER TABLE "artists-favorites" DROP CONSTRAINT "FK_7346a9a994645b9b33695bd36c2"`);
        await queryRunner.query(`ALTER TABLE "albums-favorites" DROP CONSTRAINT "FK_da45d0b5e81bfdf2700bf40d1f1"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tracks-favorites"`);
        await queryRunner.query(`DROP TABLE "artists-favorites"`);
        await queryRunner.query(`DROP TABLE "albums-favorites"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "artists"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
    }

}
