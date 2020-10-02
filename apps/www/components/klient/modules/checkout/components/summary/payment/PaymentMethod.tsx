import React, { useState } from 'react';
import { Field } from 'react-final-form';

import blik from '../../../../../../../assets/blik.png';
import paypal from '../../../../../../../assets/paypal.png';
import visa_master from '../../../../../../../assets/visa_master.png';

import { StripeCard } from './StripeCard';

export enum SelectedOption {
  Card = 'CARD',
  Blik = 'BLIK',
  PayPal = 'PAYPAL',
}

export const PaymentMethod = React.memo(() => {
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null);

  const handleChange = (value: SelectedOption): void => {
    setSelectedOption(value);
  };
  return (
    <section className="my-8">
      <h4 className="py-2 text-xl">Metoda płatności</h4>
      <p className="pb-2 text-sm">Wszystkie transakcje są bezpieczne i szyfrowane</p>
      <div className="flex justify-between p-2 border border-gray-200">
        <div className="flex items-center">
          <label className="pr-2">
            <Field name="payment" type="radio" value="karta">
              {({ input }) => (
                <input
                  {...input}
                  type="radio"
                  id="karta"
                  className="mr-2"
                  checked={selectedOption === SelectedOption.Card}
                  onChange={() => handleChange(SelectedOption.Card)}
                />
              )}
            </Field>
            Karta płatnicza
          </label>
        </div>
        <img src={visa_master} alt="visa" className="w-20" />
      </div>
      {selectedOption === SelectedOption.Card && <StripeCard />}
      <div className="flex justify-between p-2 border border-gray-200">
        <div className="flex items-center">
          <label className="pr-2">
            <Field name="payment" type="radio" value="blik">
              {({ input }) => (
                <input
                  {...input}
                  type="radio"
                  id="blik"
                  className="mr-2"
                  checked={selectedOption === SelectedOption.Blik}
                  onChange={() => handleChange(SelectedOption.Blik)}
                />
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
              {({ input }) => (
                <input
                  {...input}
                  type="radio"
                  id="paypal"
                  className="mr-2"
                  checked={selectedOption === SelectedOption.PayPal}
                  onChange={() => handleChange(SelectedOption.PayPal)}
                />
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

PaymentMethod.displayName = 'PaymentMethod';
