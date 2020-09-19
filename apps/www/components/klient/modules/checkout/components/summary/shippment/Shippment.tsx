import React from 'react';
import { Field } from 'react-final-form';

export const Shippment = React.memo(() => {
  return (
    <section className="p-4 border-b border-gray-400">
      <h4>Forma dostawy</h4>
      <div className="flex justify-between py-1">
        <div className="flex items-center">
          <label className="pr-2">
            <Field name="shippment" type="radio" value="poczta">
              {({ input, meta }) => (
                <input {...input} component="input" type="radio" id="poczta" className="mr-2" />
              )}
            </Field>
            Poczta Polska
          </label>
        </div>
        <p>20 zł</p>
      </div>
      <div className="flex justify-between py-1">
        <div className="flex items-center">
          <label className="pr-2">
            <Field name="shippment" type="radio" value="kurier">
              {({ input, meta }) => (
                <input {...input} component="input" type="radio" id="kurier" className="mr-2" />
              )}
            </Field>
            Kurier
          </label>
        </div>
        <p>30 zł</p>
      </div>
      <div className="flex justify-between py-1">
        <div className="flex items-center">
          <label className="pr-2">
            <Field name="shippment" type="radio" value="paczkomat">
              {({ input, meta }) => (
                <input {...input} component="input" type="radio" id="paczkomat" className="mr-2" />
              )}
            </Field>
            Paczkomat
          </label>
        </div>
        <p>20 zł</p>
      </div>
    </section>
  );
});
