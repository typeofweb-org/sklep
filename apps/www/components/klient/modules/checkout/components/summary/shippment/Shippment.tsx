import React from 'react';

export const Shippment = React.memo(() => {
  return (
    <section className="p-4 border-b border-gray-400">
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
    </section>
  );
});
