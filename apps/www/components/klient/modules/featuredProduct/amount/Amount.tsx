import React from 'react';
import { Field } from 'react-final-form';
import NumberInput from 'react-number-format';

import { FormErrorMessage } from '../../checkout/components/formErrorMessage/FormErrorMessage';

type AmountProps = {
  readonly increaseAmount: () => void;
  readonly decreaseAmount: () => void;
};

export const Amount = React.memo<AmountProps>(({ increaseAmount, decreaseAmount }) => (
  <div className="flex justify-center flex-col items-center w-full border-t border-r border-l border-gray-500 py-2 mt-10">
    <Field name="quantity">
      {({ input: { onBlur, onFocus, value, onChange, name }, meta }) => (
        <>
          <div>
            <button
              disabled={value <= 1}
              onClick={decreaseAmount}
              type="button"
              aria-label="Zmniejsz ilość produktu"
              className="px-2 mr-1"
            >
              &lt;
            </button>
            <NumberInput
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value as number}
              name={name}
              decimalSeparator={false}
              className="w-8 border-none bg-transparent outline-none text-center"
            />
            <button
              onClick={increaseAmount}
              type="button"
              aria-label="Zwiększ ilość produktu"
              className="px-2 ml-1"
            >
              &gt;
            </button>
          </div>
          <div>
            <FormErrorMessage meta={meta} />
          </div>
        </>
      )}
    </Field>
  </div>
));

Amount.displayName = 'Amount';
