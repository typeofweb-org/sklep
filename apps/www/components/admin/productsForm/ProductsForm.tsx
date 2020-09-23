import { Add16 } from '@carbon/icons-react';
import type { SklepTypes } from '@sklep/types';
import {
  Button,
  TextInput,
  TextArea,
  NumberInput,
  Loading,
  Toggle,
  Link as CarbonLink,
  Grid,
  Row,
  Column,
  InlineNotification,
} from 'carbon-components-react';
import React from 'react';
import { Field } from 'react-final-form';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import { getErrorProps, ToWForm } from '../../../utils/formUtils';

import { ProductSlug } from './ProductSlug';
import styles from './ProductsForm.module.scss';

Yup.setLocale({
  mixed: {
    required: ({ label }) => (label ? `${label} jest polem wymaganym` : `To pole jest wymagane`),
  },
});

const productSchema = Yup.object({
  name: Yup.string().required().label('Nazwa produktu'),
  description: Yup.string().required().label('Opis produktu'),
  regularPrice: Yup.number().required().label('Cena produktu'),
  discountPrice: Yup.number().optional().nullable(),
  isPublic: Yup.boolean().required().default(false),
  type: Yup.string().oneOf(['SINGLE']).required().default('SINGLE'), // @todo
}).required();
type ProductBody = Yup.InferType<typeof productSchema>;
type ProductFormMode = ProductsFormProps['mode'];
type ProductsFormProps =
  | {
      readonly mutation: (values: SklepTypes['postProductsRequestBody']) => Promise<any>;
      readonly mode: 'ADDING';
      readonly initialValues?: undefined;
    }
  | {
      readonly mutation: (values: SklepTypes['putProductsProductIdRequestBody']) => Promise<any>;
      readonly mode: 'EDITING';
      readonly initialValues: SklepTypes['postProductsRequestBody'];
    };

export const ProductsForm = ({ mutation, mode = 'ADDING', initialValues }: ProductsFormProps) => {
  const [mutate, { isLoading, isSuccess, isError }] = useMutation(mutation);

  const handleSubmit = React.useCallback(
    async (body: ProductBody) => {
      // @todo handle server errors
      await mutate({ ...body, type: 'SINGLE' }); // @todo
    },
    [mutate],
  );

  return (
    <ToWForm
      onSubmit={handleSubmit}
      schema={productSchema}
      className={styles.form}
      initialValues={initialValues}
    >
      <Grid>
        <Field<string> name="name">
          {({ input, meta }) => (
            <TextInput
              {...input}
              {...getErrorProps(meta)}
              id="name"
              labelText="Nazwa produktu"
              placeholder="Wpisz nazwę produktu"
              helperText={
                <>
                  Adres produktu:{' '}
                  <CarbonLink disabled>
                    https://www.sklep.localhost:3000/produkt/
                    <ProductSlug name={input.value} />
                  </CarbonLink>
                </>
              }
              // helperText="Ta nazwa będzie widoczna dla Twoich klientów. Jej uproszczona wersja posłuży także jako adres strony."
            />
          )}
        </Field>
        <Row>
          <Column>
            <Field<number> name="regularPrice">
              {({ input, meta }) => (
                <NumberInput
                  {...input}
                  {...getErrorProps(meta)}
                  id="regularPrice"
                  label="Cena produktu"
                  helperText="Cena bez rabatów i bez podatków (VAT, GST)."
                  allowEmpty
                />
              )}
            </Field>
          </Column>
          <Column>
            <Field<number> name="discountPrice">
              {({ input, meta }) => (
                <NumberInput
                  {...input}
                  {...getErrorProps(meta)}
                  id="discountPrice"
                  label="Promocyjna cena produktu"
                  helperText="Cena w promocji, ale bez podatków (VAT, GST)."
                  allowEmpty
                />
              )}
            </Field>
          </Column>
        </Row>
        <Field name="description">
          {({ input, meta }) => (
            <TextArea
              {...input}
              {...getErrorProps(meta)}
              id="description"
              labelText="Opis produktu"
            />
          )}
        </Field>
        <Field<boolean> name="isPublic" defaultValue={false} type="checkbox">
          {({ input: { value, checked, ...rest } }) => {
            return (
              <Toggle
                {...rest}
                toggled={checked}
                id="isPublic"
                labelText="Czy produkt ma być widoczny na stronie?"
                labelA="Nie"
                labelB="Tak"
              />
            );
          }}
        </Field>
        <Button kind="primary" type="submit" renderIcon={Add16} disabled={isLoading}>
          {formSubmitTextMap[mode]}
        </Button>
        {isLoading && <Loading />}
        {isSuccess && <InlineNotification title={formSuccesTextMap[mode]} kind="success" />}
        {isError && <InlineNotification title={formErrorTextMap[mode]} kind="error" />}
      </Grid>
    </ToWForm>
  );
};

type TextMap = Record<ProductFormMode, string>;
const formSubmitTextMap: TextMap = {
  ADDING: 'Dodaj produkt',
  EDITING: 'Zaaktualizuj produkt',
};
const formSuccesTextMap: TextMap = {
  ADDING: 'Dodałeś produkt do bazy danych',
  EDITING: 'Produkt został pomyślnie edytowany',
};
const formErrorTextMap: TextMap = {
  ADDING: 'Wystąpił błąd podczas dodawania produktu do bazy danych',
  EDITING: 'Wystąpił błąd podczas aktualizowania produktu',
};
