import { initDb } from "./db";
import { getServerWithPlugins } from "./server";
import { getConfig } from "./config";
import Dotenv from "dotenv";

if (getConfig("NODE_ENV") !== "production") {
  Dotenv.config({ path: ".env.dev" });
} else {
  Dotenv.config();
}

const start = async () => {
  console.log(await initDb());
  const sklepServer = await getServerWithPlugins();
  await sklepServer.start();

  console.info("Server running at:", sklepServer.info.uri);
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
