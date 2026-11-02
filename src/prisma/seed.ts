import database from "@/prisma";

await database.runtime().query(database.raw.sql`SELECT 1 AS ok`.returnsRow({ ok: "pg/int4@1" }).build());

await database.close();
console.log("Done");
