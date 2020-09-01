import { initDb, prisma } from "./db";
import { getServerWithPlugins } from "./server";
import { getConfig } from "./config";
import Dotenv from "dotenv";

if (getConfig("NODE_ENV") !== "production") {
  Dotenv.config({ path: ".env.dev" });
} else {
  Dotenv.config();
}

declare module "@hapi/hapi" {
  export interface ServerApplicationState {
    readonly db: typeof prisma;
  }
}

const start = async () => {
  console.log(await initDb());
  const sklepServer = await getServerWithPlugins();

  // @ts-expect-error
  sklepServer.app.db = prisma;

  await sklepServer.start();

  console.info("Server running at:", sklepServer.info.uri);
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
