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
  readonly code: 'P2000';
  readonly column_name: string;
};

type RecordNotFound = {
  readonly code: 'P2001';
  /**
   * @description Model name from Prisma schema
   **/
  readonly model_name: string;

  /**
   * @description Argument name from a supported query on a Prisma schema model
   **/
  readonly argument_name: string;

  /**
   * @description Concrete value provided for an argument on a query. Should be peeked/truncated if too long to display in the error message
   **/
  readonly argument_value: string;
};

type UniqueKeyViolation = {
  readonly code: 'P2002';
  readonly constraint: DatabaseConstraint;
};

type ForeignKeyViolation = {
  readonly code: 'P2003';
  /**
   * @description Field name from one model from Prisma schema
   **/
  readonly field_name: string;
};

type ConstraintViolation = {
  readonly code: 'P2004';
  /**
   * @description Database error returned by the underlying data source
   **/
  readonly database_error: string;
};

type StoredValueIsInvalid = {
  readonly code: 'P2005';
  /**
   * @description Concrete value provided for a field on a model in Prisma schema. Should be peeked/truncated if too long to display in the error message
   **/
  readonly field_value: string;

  /**
   * @description Field name from one model from Prisma schema
   **/
  readonly field_name: string;
};

type TypeMismatch = {
  readonly code: 'P2006';
  /**
   * @description Concrete value provided for a field on a model in Prisma schema. Should be peeked/truncated if too long to display in the error message
   **/
  readonly field_value: string;

  /**
   * @description Model name from Prisma schema
   **/
  readonly model_name: string;

  /**
   * @description Field name from one model from Prisma schema
   **/
  readonly field_name: string;
};

type TypeMismatchInvalidCustomType = {
  readonly code: 'P2007';
  /**
   * @description Database error returned by the underlying data source
   **/
  readonly database_error: string;
};

type QueryParsingFailed = {
  readonly code: 'P2008';
  /**
   * @description Error(s) encountered when trying to parse a query in the query engine
   **/
  readonly query_parsing_error: string;

  /**
   * @description Location of the incorrect parsing, validation in a query. Represented by tuple or object with (line, character)
   **/
  readonly query_position: string;
};

type QueryValidationFailed = {
  readonly code: 'P2009';
  /**
   * @description Error(s) encountered when trying to validate a query in the query engine
   **/
  readonly query_validation_error: string;

  /**
   * @description Location of the incorrect parsing, validation in a query. Represented by tuple or object with (line, character)
   **/
  readonly query_position: string;
};

type RawQueryFailed = {
  readonly code: 'P2010';
  readonly message: string;
};

type NullConstraintViolation = {
  readonly code: 'P2011';
  readonly constraint: DatabaseConstraint;
};

type MissingRequiredValue = {
  readonly code: 'P2012';
  readonly path: string;
};

type MissingRequiredArgument = {
  readonly code: 'P2013';
  readonly argument_name: string;
  readonly field_name: string;
  readonly object_name: string;
};

type RelationViolation = {
  readonly code: 'P2014';
  readonly relation_name: string;
  readonly model_a_name: string;
  readonly model_b_name: string;
};

type RelatedRecordNotFound = {
  readonly code: 'P2015';
  readonly details: string;
};

type InterpretationError = {
  readonly code: 'P2016';
  readonly details: string;
};

type RecordsNotConnected = {
  readonly code: 'P2017';
  readonly relation_name: string;
  readonly parent_name: string;
  readonly child_name: string;
};

type ConnectedRecordsNotFound = {
  readonly code: 'P2018';
  readonly details: string;
};

type InputError = {
  readonly code: 'P2019';
  readonly details: string;
};

type ValueOutOfRange = {
  readonly code: 'P2020';
  readonly details: string;
};

type TableDoesNotExist = {
  readonly code: 'P2021';
  readonly table: string;
};

type ColumnDoesNotExist = {
  readonly code: 'P2022';
  readonly column: string;
};
