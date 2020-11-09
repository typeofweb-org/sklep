import { ResponseError } from '../../../../utils/fetcher';

export interface Validation {
  readonly source: string;
  readonly keys: readonly string[];
}

export interface My400Error {
  readonly statusCode: number;
  readonly error: string;
  readonly message: string;
  readonly validation: Validation;
}

export function serverErrorHandler(err: unknown) {
  if (err instanceof ResponseError && err.status === 400) {
    const error = err.data as My400Error;
    const field = error.validation.keys[0];
    return { [field]: error.message };
  }
  return err;
}
