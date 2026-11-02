import { env } from "@/env";
import { app } from "@/app";

app.listen(env.PORT);

console.log(`Backend running at http://${app.server?.hostname}:${app.server?.port}`);
