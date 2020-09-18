import React from 'react';

import { SummaryButton } from '../../../../cart/components/summary/summaryButton/SummaryButton';

export const CheckoutTotal = React.memo(() => {
  return (
    <div className="px-2">
      <div className="border border-gray-400 bg-gray-100">
        <div className="flex justify-between border-b border-gray-400 w-full p-4">
          <span>Kwota</span>
          <span>2020 zł</span>
        </div>
        <div className="p-4 border-b border-gray-400">
          <h4>Forma dostawy</h4>
          <div className="flex justify-between py-1">
            <div className="flex items-center">
              <input type="radio" id="poczta" name="shipping" value="poczta" className="mr-2" />
              <label htmlFor="poczta">Poczta polska</label>
            </div>
            <p>20 zł</p>
          </div>
          <div className="flex justify-between py-1">
            <div className="flex items-center">
              <input type="radio" id="kurier" name="shipping" value="kurier" className="mr-2" />
              <label htmlFor="kurier">Kurier</label>
            </div>
            <p>30 zł</p>
          </div>
          <div className="flex justify-between py-1">
            <div className="flex items-center">
              <input
                type="radio"
                id="paczkomatInpost"
                name="shipping"
                value="paczkomatInpost"
                className="mr-2"
              />
              <label htmlFor="paczkomatInpost">Paczkomat Inpost</label>
            </div>
            <p>20 zł</p>
          </div>
        </div>
        <div className="flex justify-between w-full p-4 text-2xl">
          <span>Kwota</span>
          <span>2020 zł</span>
        </div>
      </div>
      <SummaryButton>Złóż zamówienie</SummaryButton>
    </div>
  );
});
