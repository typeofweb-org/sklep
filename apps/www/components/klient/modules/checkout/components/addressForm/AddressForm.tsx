import React from 'react';
import { Field } from 'react-final-form';
import Select from 'react-select';

import { getErrorProps, ToWForm } from '../../../../../../utils/formUtils';

export const AddressForm = () => {
  const regions = [{ value: 'mazowieckie', label: 'mazowieckie' }];

  const fieldStyles = 'border border-gray-300 rounded-sm px-4 py-2';

  return (
    <div className="w-full md:w-2/3 mb-4 px-4">
      <h3 className="text-2xl">Dane adresowe</h3>
      <ToWForm>
        <div className="flex py-2">
          <div className="flex flex-col w-1/2 mr-4">
            <label htmlFor="firstName" className="py-2">
              Imię
            </label>
            <Field name="firstName">
              {({ input, meta }) => (
                <input
                  {...input}
                  {...getErrorProps(meta)}
                  component="input"
                  id="firstName"
                  labelText="Imię"
                  placeholder="Imię"
                  className={fieldStyles}
                />
              )}
            </Field>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="lastName" className="py-2">
              Nazwisko
            </label>
            <Field name="lastName">
              {({ input, meta }) => (
                <input
                  {...input}
                  {...getErrorProps(meta)}
                  component="input"
                  id="lastName"
                  labelText="Nazwisko"
                  placeholder="Nazwisko"
                  className={fieldStyles}
                />
              )}
            </Field>
          </div>
        </div>
        <div className="flex flex-col w-full py-2">
          <label htmlFor="companyName" className="py-2">
            Nazwa firmy (opcjonalnie)
          </label>
          <Field name="companyName">
            {({ input, meta }) => (
              <input
                {...input}
                {...getErrorProps(meta)}
                component="input"
                id="companyName"
                labelText="Nazwa firmy"
                placeholder="Nazwa firmy"
                className={fieldStyles}
              />
            )}
          </Field>
        </div>
        <div className="flex flex-col w-full py-2">
          <label htmlFor="lastName" className="py-2">
            Województwo
          </label>
          <Field name="region">
            {() => (
              <div className={fieldStyles}>
                <Select options={regions} />
              </div>
            )}
          </Field>
        </div>
        <div className="flex flex-col w-full py-2">
          <label htmlFor="streetName" className="py-2">
            Nazwa ulicy
          </label>
          <Field name="streetName">
            {({ input, meta }) => (
              <input
                {...input}
                {...getErrorProps(meta)}
                component="input"
                id="streetName"
                labelText="Nazwa ulicy"
                placeholder="Nazwa ulicy"
                className={fieldStyles}
              />
            )}
          </Field>
        </div>
        <div className="flex py-2">
          <div className="flex flex-col w-1/2 mr-4">
            <label htmlFor="houseNumber" className="py-2">
              Numer domu
            </label>
            <Field name="houseNumber">
              {({ input, meta }) => (
                <input
                  {...input}
                  {...getErrorProps(meta)}
                  component="input"
                  id="houseNumber"
                  labelText="Numer domu"
                  placeholder="Numer domu"
                  className={fieldStyles}
                />
              )}
            </Field>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="apartmentNumber" className="py-2">
              Numer lokalu
            </label>
            <Field name="apartmentNumber">
              {({ input, meta }) => (
                <input
                  {...input}
                  {...getErrorProps(meta)}
                  component="input"
                  id="apartmentNumber"
                  labelText="Numer lokalu"
                  placeholder="Numer lokalu"
                  className={fieldStyles}
                />
              )}
            </Field>
          </div>
        </div>
        <div className="flex flex-col w-full py-2">
          <label htmlFor="city" className="py-2">
            Miasto
          </label>
          <Field name="city">
            {({ input, meta }) => (
              <input
                {...input}
                {...getErrorProps(meta)}
                component="input"
                id="city"
                labelText="Miasto"
                placeholder="Miasto"
                className={fieldStyles}
              />
            )}
          </Field>
        </div>
        <div className="flex flex-col w-full py-2">
          <label htmlFor="zipCode" className="py-2">
            Kod pocztowy
          </label>
          <Field name="zipCode">
            {({ input, meta }) => (
              <input
                {...input}
                {...getErrorProps(meta)}
                component="input"
                id="zipCode"
                labelText="Kod pocztowy"
                placeholder="Kod pocztowy"
                className={fieldStyles}
              />
            )}
          </Field>
        </div>
        <div className="flex flex-col w-full py-2">
          <label htmlFor="phone" className="py-2">
            Telefon
          </label>
          <Field name="phone">
            {({ input, meta }) => (
              <input
                {...input}
                {...getErrorProps(meta)}
                component="input"
                id="phone"
                labelText="Telefon"
                placeholder="Telefon"
                className={fieldStyles}
              />
            )}
          </Field>
        </div>
        <div className="flex flex-col w-full py-2">
          <label htmlFor="email" className="py-2">
            Adres email
          </label>
          <Field name="email">
            {({ input, meta }) => (
              <input
                {...input}
                {...getErrorProps(meta)}
                component="input"
                id="email"
                labelText="Adres email"
                placeholder="Adres email"
                className={fieldStyles}
              />
            )}
          </Field>
        </div>
      </ToWForm>
    </div>
  );
};
