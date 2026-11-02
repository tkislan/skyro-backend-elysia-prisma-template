# Backend – šablóna

Prázdny backend na Bun + Elysia + Prisma 8 + PostgreSQL. Všetky balíčky sú v `package.json`
pripnuté na presné verzie, takže `bun install` ti nainštaluje presne to, s čím kurz počíta.

> Prisma 8 je zatiaľ release candidate – verzia pred finálnym vydaním, v ktorej sa ešte môžu
> zmeniť detaily API. Verzie v `package.json` preto nemeň a nepridávaj `prisma` cez `bun add`.

## Čo potrebuješ

- Bun 1.4 alebo novší (`bun --version`) – starší Bun nevie čítať dátumy z Prismy 8
- Docker

## Spustenie

```shell
bun install
cp .env.example .env
docker compose up -d --wait
bun dev
```

`GET localhost:3000/health` musí vrátiť `{"status":"success","message":"OK"}`.

## Čo je v projekte

| Súbor | Na čo je |
|---|---|
| `src/index.ts` | spustí server |
| `src/app.ts` | Elysia aplikácia s endpointom `GET /health` – sem pridávaš svoje moduly |
| `src/env.ts` | premenné prostredia cez envalid, `import { env } from "@/env"` – bez `DATABASE_URL` server nenaštartuje |
| `src/utils/parse-bearer-token.ts` | z hlavičky `Authorization: Bearer <token>` vráti token, inak `null` |
| `src/utils/parse-bearer-token.test.ts` | jeho unit testy – unit test patrí do súboru `*.test.ts` vedľa kódu, ktorý testuje |
| `tests/health.test.ts` | integračný test `GET /health` cez `app.handle` – integračné testy patria do `tests/` |
| `src/prisma/contract.prisma` | kontrakt – zatiaľ bez modelov |
| `src/prisma/index.ts` | klient Prismy, `import database from "@/prisma"` |
| `src/prisma/seed.ts` | seed – zatiaľ len overí spojenie s databázou cez `SELECT 1` a vypíše `Done` |
| `docker-compose.yaml` | PostgreSQL 17 s databázou `app` |

## Skripty

| Príkaz | Čo robí |
|---|---|
| `bun dev` | spustí server a reštartuje ho pri každej zmene |
| `bun test` | spustí všetky testy zo súborov `*.test.ts` |
| `bun run test:unit` | spustí len unit testy, teda `*.test.ts` v `src/` |
| `bun run test:integration` | spustí len integračné testy v `tests/` |
| `bun run typecheck` | skontroluje typy (Bun ich pri spúšťaní nekontroluje) |
| `bun run db:emit` | z kontraktu vygeneruje `contract.json` a `contract.d.ts` |
| `bun run db:plan <nazov>` | naplánuje migráciu, napríklad `bun run db:plan add_users` |
| `bun run db:migrate` | zbehne migrácie na tvojej databáze |
| `bun run db:verify` | overí, že databáza sedí s kontraktom |
| `bun run seed` | spustí `src/prisma/seed.ts` |

## Zmena schémy

Uprav `src/prisma/contract.prisma` a zbehni:

```shell
bun run db:emit
bun run db:plan add_users
bun run db:migrate
```

Do gitu commitni `src/prisma/contract.json`, `src/prisma/contract.d.ts` aj celý priečinok `migrations/`.
