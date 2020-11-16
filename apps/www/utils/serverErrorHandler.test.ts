import { serverErrorHandler } from './serverErrorHandler';

const multipleErrors = {
  status: 400,
  name: 'test name',
  message: 'test message',
  data: {
    statusCode: 400,
    error: 'Bad Request',
    message: 'string.base. any.required',
    validation: {
      source: 'payload',
      keys: ['name', 'description', 'regularPrice'],
    },
    details: [
      {
        message: 'string.base',
        path: ['name'],
        type: 'string.base',
      },
      {
        message: 'string.base',
        path: ['description'],
        type: 'string.base',
      },
      {
        message: 'any.required',
        path: ['regularPrice'],
        type: 'any.required',
      },
    ],
  },
};

const oneError = {
  status: 400,
  name: 'test nameA',
  message: 'test message',
  data: {
    statusCode: 400,
    error: 'Bad Request',
    message: 'string.base',
    validation: {
      source: 'payload',
      keys: ['name', 'description', 'regularPrice'],
    },
    details: [
      {
        message: 'string.base',
        path: ['name'],
        type: 'string.base',
      },
    ],
  },
};

const not400Error = {
  status: 401,
  name: 'Unauthorized',
  message: 'test message',
  data: {
    statusCode: 401,
    error: 'Bad Request',
    message: 'string.base',
    validation: {
      source: 'payload',
      keys: ['name', 'description', 'regularPrice'],
    },
    details: [
      {
        message: 'string.base',
        path: ['name'],
        type: 'string.base',
      },
    ],
  },
};

describe('Test status 400 server error handling', () => {
  it('should return proper error - one error ', () => {
    expect(serverErrorHandler(oneError)).toEqual({ name: 'Pole musi być tekstem' });
  });

  it('should returrn proper errors - multiple errors', () => {
    expect(serverErrorHandler(multipleErrors)).toEqual({
      name: 'Pole musi być tekstem',
      description: 'Pole musi być tekstem',
      regularPrice: 'To pole jest wymagane',
    });
  });

  it('should throw error when status is other than 400', () => {
    expect(() => serverErrorHandler(not400Error)).toThrowError(not400Error);
  });
});
