import React, { useState } from 'react';
import { Field } from 'react-final-form';

import visa_master from '../../../../../../../assets/visa_master.png';

import { StripeCard } from './StripeCard';

export enum SelectedOption {
  Card = 'CARD',
}

export const PaymentMethod = React.memo(() => {
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(SelectedOption.Card);

  const handleChange = React.useCallback((value: SelectedOption) => {
    setSelectedOption(value);
  }, []);

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
    </section>
  );
});

PaymentMethod.displayName = 'PaymentMethod';
