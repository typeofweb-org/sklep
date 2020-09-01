type NameToType = {
  ENV: "production" | "staging" | "development" | "test";
  NODE_ENV: "production" | "development";
  PORT: number;
  COOKIE_DOMAIN: string;
  COOKIE_PASSWORD: string;
};

export function getConfig<T extends keyof NameToType>(name: T): NameToType[T];
export function getConfig(name: string): string | number {
  const val = process.env[name];

  switch (name) {
    case "NODE_ENV":
      return val || "development";
    case "ENV":
      return val || "development";
    case "PORT":
      return Number.parseInt(val?.trim() || "3000", 10);
  }

  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }

  return val;
}

export const isProd = () => getConfig("ENV") === "production";
export const isStaging = () => getConfig("ENV") === "staging";
