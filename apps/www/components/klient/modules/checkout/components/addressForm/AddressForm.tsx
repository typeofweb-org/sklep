import React from 'react';
import { Field, Form } from 'react-final-form';

export const AddressForm = ({ onSubmit }) => {
  const regions = [{ value: 'mazowieckie', label: 'mazowieckie' }];

  const fieldStyles = 'border border-gray-300 rounded-sm px-4 py-2';
  const labelStyles = 'flex flex-col w-full';
  const labelTitleStyles = 'py-2';

  return (
    <div className="w-full md:w-2/3 mb-4 px-2 sm:px-4">
      <h3 className="text-2xl">Dane adresowe</h3>
      <div className="flex flex-col sm:flex-row py-2">
        <div className="flex flex-col sm:w-1/2 sm:pr-2">
          <label className={labelStyles}>
            <span className={labelTitleStyles}>Imię</span>
            <Field name="firstName">
              {({ input, meta }) => (
                <div className="flex flex-col">
                  <input {...input} placeholder="Imię" className={fieldStyles} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </label>
        </div>
        <div className="flex flex-col sm:w-1/2 sm:pl-2">
          <label className={labelStyles}>
            <span className={labelTitleStyles}>Nazwisko</span>
            <Field name="lastName">
              {({ input, meta }) => (
                <input {...input} placeholder="Nazwisko" className={fieldStyles} />
              )}
            </Field>
          </label>
        </div>
      </div>
      <label className={labelStyles}>
        <span className={labelTitleStyles}> Nazwa firmy (opcjonalnie)</span>
        <Field name="companyName">
          {({ input, meta }) => (
            <input {...input} placeholder="Nazwa firmy" className={fieldStyles} />
          )}
        </Field>
      </label>
      <label className={labelStyles}>
        <span className={labelTitleStyles}>Nazwa ulicy</span>
        <Field name="streetName">
          {({ input, meta }) => (
            <input {...input} placeholder="Nazwa ulicy" className={fieldStyles} />
          )}
        </Field>
      </label>
      <div className="flex py-2">
        <div className="flex flex-col w-1/2 pr-2">
          <label className={labelStyles}>
            <span className={labelTitleStyles}>Numer domu</span>
            <Field name="houseNumber">
              {({ input, meta }) => (
                <input {...input} placeholder="Nr domu" className={fieldStyles} />
              )}
            </Field>
          </label>
        </div>
        <div className="flex flex-col w-1/2 pl-2">
          <label className={labelStyles}>
            <span className={labelTitleStyles}>Numer lokalu</span>
            <Field name="apartmentNumber">
              {({ input, meta }) => (
                <input {...input} placeholder="Nr lokalu" className={fieldStyles} />
              )}
            </Field>
          </label>
        </div>
      </div>
      <label className={labelStyles}>
        <span className={labelTitleStyles}>Miasto</span>
        <Field name="city">
          {({ input, meta }) => <input {...input} placeholder="Miasto" className={fieldStyles} />}
        </Field>
      </label>
      <label className={labelStyles}>
        <span className={labelTitleStyles}>Kod pocztowy</span>
        <Field name="zipCode">
          {({ input, meta }) => (
            <input {...input} placeholder="Kod pocztowy" className={fieldStyles} />
          )}
        </Field>
      </label>
      <label className={labelStyles}>
        <span className={labelTitleStyles}>Telefon</span>
        <Field name="phone" type="tel">
          {({ input, meta }) => <input {...input} placeholder="Telefon" className={fieldStyles} />}
        </Field>
      </label>
      <label className={labelStyles}>
        <span className={labelTitleStyles}>Adres email</span>
        <Field name="email" type="email">
          {({ input, meta }) => (
            <input {...input} placeholder="Adres email" className={fieldStyles} />
          )}
        </Field>
      </label>
    </div>
  );
};
