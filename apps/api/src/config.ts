import { parse } from 'url';

import type { Nil } from './types';

type NameToType = {
  ENV: 'production' | 'staging' | 'development' | 'test';
  NODE_ENV: 'production' | 'development';
  PORT: number;
  COOKIE_DOMAIN: string;
  COOKIE_PASSWORD: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOSTNAME: string;
  DATABASE_URL: string;
};

function getConfigForName<T extends keyof NameToType>(name: T): Nil<NameToType[T]>;
function getConfigForName(name: keyof NameToType): Nil<NameToType[keyof NameToType]> {
  const val = process.env[name];
  const parsed = parse(process.env.DATABASE_URL || '');

  switch (name) {
    case 'NODE_ENV':
      return val || 'development';
    case 'ENV':
      return val || 'development';
    case 'PORT':
      return Number.parseInt(val?.trim() || '3000', 10);
    case 'DB_USERNAME':
      return val || parsed.auth?.split(':')[0];
    case 'DB_PASSWORD':
      return val || parsed.auth?.split(':')[1];
    case 'DB_NAME':
      return val || parsed.pathname?.slice(1);
    case 'DB_HOSTNAME':
      return val || parsed.hostname;
  }
  return val;
}

export function getConfig<T extends keyof NameToType>(name: T): NameToType[T];
export function getConfig(name: keyof NameToType): NameToType[keyof NameToType] {
  const val = getConfigForName(name);

  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }

  return val;
}

export const isProd = () => getConfig('ENV') === 'production';
export const isStaging = () => getConfig('ENV') === 'staging';
