import React from 'react';
import { Field } from 'react-final-form';

import blik from '../../../../../../../assets/blik.png';
import paypal from '../../../../../../../assets/paypal.png';
import visa_master from '../../../../../../../assets/visa_master.png';

export const Payment = React.memo(() => {
  return (
    <section className="my-8">
      <h4 className="py-2 text-xl">Metoda płatności</h4>
      <p className="pb-2 text-sm">Wszystkie transakcje są bezpieczne i szyfrowane</p>
      <div className="flex justify-between p-2 border border-gray-200 w-full">
        <div className="flex items-center">
          <label className="pr-2">
            <Field name="payment" type="radio" value="karta">
              {({ input, meta }) => (
                <input {...input} component="input" type="radio" id="karta" className="mr-2" />
              )}
            </Field>
            Karta płatnicza
          </label>
        </div>
        <img src={visa_master} alt="visa" className="w-20" />
      </div>
      <div className="flex justify-between p-2 border border-gray-200">
        <div className="flex items-center">
          <label className="pr-2">
            <Field name="payment" type="radio" value="blik">
              {({ input, meta }) => (
                <input {...input} component="input" type="radio" id="blik" className="mr-2" />
              )}
            </Field>
            Płatność BLIK
          </label>
        </div>
        <img src={blik} alt="blik" className="w-20" />
      </div>
      <div className="flex justify-between p-2 border border-gray-200">
        <div className="flex items-center">
          <label className="pr-2">
            <Field name="payment" type="radio" value="paypal">
              {({ input, meta }) => (
                <input {...input} component="input" type="radio" id="paypal" className="mr-2" />
              )}
            </Field>
            PayPal
          </label>
        </div>
        <img src={paypal} alt="paypal" className="w-20" />
      </div>
    </section>
  );
});
