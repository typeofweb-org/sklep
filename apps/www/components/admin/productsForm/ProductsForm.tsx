import { Add16 } from '@carbon/icons-react';
import type { SklepTypes } from '@sklep/types';
import {
  Button,
  Column,
  Grid,
  InlineLoading,
  Link as CarbonLink,
  NumberInput,
  Row,
  TextArea,
  TextInput,
  Toggle,
} from 'carbon-components-react';
import { useRouter } from 'next/router';
import React from 'react';
import { Field } from 'react-final-form';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import { getErrorProps, ToWForm } from '../../../utils/formUtils';
import { serverErrorHandler } from '../../../utils/serverErrorHandler';
import { useToasts } from '../toasts/Toasts';

import { ProductSlug } from './ProductSlug';
import styles from './ProductsForm.module.scss';

Yup.setLocale({
  mixed: {
    required: ({ label }: { readonly label?: string }) =>
      label ? `${label} jest polem wymaganym` : `To pole jest wymagane`,
  },
});

const productSchema = Yup.object({
  name: Yup.string().required().label('Nazwa produktu'),
  description: Yup.string().required().label('Opis produktu'),
  regularPrice: Yup.number().required().label('Cena produktu'),
  discountPrice: Yup.number()
    .optional()
    .nullable()
    .when(
      'regularPrice',
      (regularPrice: number, schema: Yup.NumberSchema<number | null | undefined>) =>
        regularPrice
          ? Yup.number().max(
              regularPrice,
              'Cena promocyjna nie może być wyższa niż cena podstawowa',
            )
          : schema,
    ),
  isPublic: Yup.boolean().required().default(false),
  type: Yup.string().oneOf(['SINGLE']).required().default('SINGLE'), // @todo
}).required();
type ProductBody = Yup.InferType<typeof productSchema>;
type ProductFormMode = ProductsFormProps['mode'];
export type ProductsFormProps =
  | {
      readonly mutation: (
        values: SklepTypes['postProductsRequestBody'],
      ) => Promise<SklepTypes['postProducts200Response']>;
      readonly mode: 'ADDING';
      readonly initialValues?: undefined;
    }
  | {
      readonly mutation: (
        values: SklepTypes['putProductsProductIdRequestBody'],
      ) => Promise<SklepTypes['putProductsProductId200Response']>;
      readonly mode: 'EDITING';
      readonly initialValues: SklepTypes['postProductsRequestBody'];
    };

export const ProductsForm = ({ mutation, mode = 'ADDING', initialValues }: ProductsFormProps) => {
  const { addToast } = useToasts();
  const router = useRouter();
  const { mutateAsync, isLoading } = useMutation(mutation, {
    onSuccess(response) {
      addToast({
        kind: 'success',
        title: 'Operacja udana',
        caption: formSuccesTextMap[mode],
      });
      if (mode === 'ADDING') {
        void router.replace(`/admin/products/${response.data.id}`);
      }
    },
    onError() {
      addToast({
        kind: 'error',
        title: 'Coś się nie powiodło',
        caption: formErrorTextMap[mode],
      });
    },
  });

  const handleSubmit = React.useCallback(
    async (body: ProductBody) => {
      try {
        await mutateAsync({ ...body, type: 'SINGLE' });
        return;
      } catch (err) {
        return serverErrorHandler(err);
      }
    },
    [mutateAsync],
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
          {!isLoading && formSubmitTextMap[mode]}
          {isLoading && <InlineLoading description={formLoadingDescription[mode]} />}
        </Button>
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
const formLoadingDescription: TextMap = {
  ADDING: 'Dodawanie...',
  EDITING: 'Aktualizowanie...',
};
