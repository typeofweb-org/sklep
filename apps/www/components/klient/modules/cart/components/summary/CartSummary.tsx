import React from 'react';
import { Field, Form } from 'react-final-form';

import { form } from '../../../../../admin/loginForm/LoginForm.module.scss';

export const CartSummary = React.memo(() => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 mb-4">
      <h3 className="text-2xl mb-8">Podsumowanie</h3>
      <div className="border border-gray-400 bg-gray-100">
        <div className="flex justify-between p-4 text-lg border-b border-gray-300">
          <h4>Suma</h4>
          <span>2020 zł</span>
        </div>
        <div className="flex flex-col p-4 text-lg">
          <Form
            initialValues={{ shipping: 'Poczta polska' }}
            onSubmit={(values) => console.log(values)}
            render={({ values }) => (
              <form>
                <label htmlFor="shipping">Dostawa:</label>
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="shipping">
                    <Field
                      name="shipping"
                      component="input"
                      type="radio"
                      value="Poczta polska"
                      className="mr-4"
                    />
                    Poczta polska
                  </label>
                  <p>200 zł</p>
                </div>
                <div className="flex justify-between items-center">
                  <label htmlFor="shipping">
                    <Field
                      name="shipping"
                      component="input"
                      type="radio"
                      value="Kurier DPD"
                      className="mr-4"
                    />
                    Kurier DPD
                  </label>
                  <p>200 zł</p>
                </div>
                <div className="flex justify-between items-center">
                  <label htmlFor="shipping">
                    <Field
                      name="shipping"
                      component="input"
                      type="radio"
                      value="Paczkomaty inPost"
                      className="mr-4"
                    />
                    Paczkomaty inPost
                  </label>
                  <p>200 zł</p>
                </div>
              </form>
            )}
          />
        </div>
        <div className="flex justify-between p-4 text-2xl border-t border-gray-300">
          <h4>Razem</h4>
          <span>2020 zł</span>
        </div>
      </div>
    </div>
  );
});
CartSummary.displayName = 'CartSummary';
