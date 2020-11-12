import { ResponseError } from '../../../../utils/fetcher';

export interface ErrorDetail {
  readonly message: string;
  readonly path: readonly string[];
  readonly type: string;
}

export interface Validation {
  readonly source: string;
  readonly keys: readonly string[];
}

export interface My400Error {
  readonly statusCode: number;
  readonly error: string;
  readonly message: string;
  readonly validation: Validation;
  readonly details: readonly ErrorDetail[];
}

interface ErrorTranslation {
  readonly [index: string]: string;
}

const badRequestErrorsTranslation: ErrorTranslation = {
  'any.required': 'To pole jest wymagane',
  'string.base': 'Pole musi być tekstem',
  'number.base': 'Pole musi być liczbą',
};

function getTranslatedErrorMessage(message: string) {
  return badRequestErrorsTranslation[message]
    ? badRequestErrorsTranslation[message]
    : 'Popraw pole';
}

export function serverErrorHandler(err: unknown) {
  if (err instanceof ResponseError && err.status === 400) {
    const { details } = err.data as My400Error;

    return details
      .map((error) => {
        return { [`${error.path[0]}`]: getTranslatedErrorMessage('error.message') };
      })
      .reduce((error1, error2) => Object.assign(error1, error2), {});
  }
  return err;
}
