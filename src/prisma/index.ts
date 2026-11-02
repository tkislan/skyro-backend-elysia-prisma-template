import postgres from "@prisma/orm-postgres/runtime";
import { env } from "@/env";
import type { Contract } from "@/prisma/contract.d";
import contractJson from "@/prisma/contract.json" with { type: "json" };

const database = postgres<Contract>({ contractJson, url: env.DATABASE_URL });

export default database;
