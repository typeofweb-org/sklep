import { Add16 } from '@carbon/icons-react';
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
import { createProduct } from './productsFormUtils';

const productSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  regularPrice: Yup.number().required(),
  discountPrice: Yup.number().optional(),
  isPublic: Yup.boolean().required().default(false),
  type: Yup.string().oneOf(['SINGLE']).required().default('SINGLE'), // @todo
}).required();
export type ProductType = Yup.InferType<typeof productSchema>;

export const ProductsForm = () => {
  const [mutate, { isLoading, isSuccess, isError }] = useMutation(createProduct);

  const handleSubmit = React.useCallback(
    async (values: ProductType) => {
      // @todo handle server errors
      await mutate({ ...values, type: 'SINGLE' }); // @todo
    },
    [mutate],
  );

  return (
    <ToWForm onSubmit={handleSubmit} schema={productSchema} className={styles.form}>
      <Grid>
        <Field name="name">
          {({ input, meta }) => (
            <>
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
            </>
          )}
        </Field>
        <Row>
          <Column>
            <Field name="regularPrice">
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
            <Field name="discountPrice">
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
        <Field name="isPublic" defaultValue={false} type="checkbox">
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
          Dodaj produkt
        </Button>
        {isLoading && <Loading />}
        {isSuccess && <InlineNotification title="Dodałeś produkt do bazy danych" kind="success" />}
        {isError && (
          <InlineNotification
            title="Wystąpił błąd podczas dodawania produktu do bazy danych"
            kind="error"
          />
        )}
      </Grid>
    </ToWForm>
  );
};
