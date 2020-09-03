import { Models } from './models';
export type Nil<T> = T | undefined | null;

export type Model<T extends Partial<Models[keyof Models]>> = T & {
  createdAt: Date;
  updatedAt: Date;
};
