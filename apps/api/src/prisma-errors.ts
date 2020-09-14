type DatabaseConstraint = unknown;

type PrismaError =
  | InputValueTooLong
  | RecordNotFound
  | UniqueKeyViolation
  | ForeignKeyViolation
  | ConstraintViolation
  | StoredValueIsInvalid
  | TypeMismatch
  | TypeMismatchInvalidCustomType
  | QueryParsingFailed
  | QueryValidationFailed
  | RawQueryFailed
  | NullConstraintViolation
  | MissingRequiredValue
  | MissingRequiredArgument
  | RelationViolation
  | RelatedRecordNotFound
  | InterpretationError
  | RecordsNotConnected
  | ConnectedRecordsNotFound
  | InputError
  | ValueOutOfRange
  | TableDoesNotExist
  | ColumnDoesNotExist;

type InputValueTooLong = {
  code: 'P2000';
  column_name: string;
};

type RecordNotFound = {
  code: 'P2001';
  /**
   * @description Model name from Prisma schema
   **/
  model_name: string;

  /**
   * @description Argument name from a supported query on a Prisma schema model
   **/
  argument_name: string;

  /**
   * @description Concrete value provided for an argument on a query. Should be peeked/truncated if too long to display in the error message
   **/
  argument_value: string;
};

type UniqueKeyViolation = {
  code: 'P2002';
  constraint: DatabaseConstraint;
};

type ForeignKeyViolation = {
  code: 'P2003';
  /**
   * @description Field name from one model from Prisma schema
   **/
  field_name: string;
};

type ConstraintViolation = {
  code: 'P2004';
  /**
   * @description Database error returned by the underlying data source
   **/
  database_error: string;
};

type StoredValueIsInvalid = {
  code: 'P2005';
  /**
   * @description Concrete value provided for a field on a model in Prisma schema. Should be peeked/truncated if too long to display in the error message
   **/
  field_value: string;

  /**
   * @description Field name from one model from Prisma schema
   **/
  field_name: string;
};

type TypeMismatch = {
  code: 'P2006';
  /**
   * @description Concrete value provided for a field on a model in Prisma schema. Should be peeked/truncated if too long to display in the error message
   **/
  field_value: string;

  /**
   * @description Model name from Prisma schema
   **/
  model_name: string;

  /**
   * @description Field name from one model from Prisma schema
   **/
  field_name: string;
};

type TypeMismatchInvalidCustomType = {
  code: 'P2007';
  /**
   * @description Database error returned by the underlying data source
   **/
  database_error: string;
};

type QueryParsingFailed = {
  code: 'P2008';
  /**
   * @description Error(s) encountered when trying to parse a query in the query engine
   **/
  query_parsing_error: string;

  /**
   * @description Location of the incorrect parsing, validation in a query. Represented by tuple or object with (line, character)
   **/
  query_position: string;
};

type QueryValidationFailed = {
  code: 'P2009';
  /**
   * @description Error(s) encountered when trying to validate a query in the query engine
   **/
  query_validation_error: string;

  /**
   * @description Location of the incorrect parsing, validation in a query. Represented by tuple or object with (line, character)
   **/
  query_position: string;
};

type RawQueryFailed = {
  code: 'P2010';
  message: string;
};

type NullConstraintViolation = {
  code: 'P2011';
  constraint: DatabaseConstraint;
};

type MissingRequiredValue = {
  code: 'P2012';
  path: string;
};

type MissingRequiredArgument = {
  code: 'P2013';
  argument_name: string;
  field_name: string;
  object_name: string;
};

type RelationViolation = {
  code: 'P2014';
  relation_name: string;
  model_a_name: string;
  model_b_name: string;
};

type RelatedRecordNotFound = {
  code: 'P2015';
  details: string;
};

type InterpretationError = {
  code: 'P2016';
  details: string;
};

type RecordsNotConnected = {
  code: 'P2017';
  relation_name: string;
  parent_name: string;
  child_name: string;
};

type ConnectedRecordsNotFound = {
  code: 'P2018';
  details: string;
};

type InputError = {
  code: 'P2019';
  details: string;
};

type ValueOutOfRange = {
  code: 'P2020';
  details: string;
};

type TableDoesNotExist = {
  code: 'P2021';
  table: string;
};

type ColumnDoesNotExist = {
  code: 'P2022';
  column: string;
};
