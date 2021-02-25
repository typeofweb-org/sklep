import type { SklepTypes } from '@sklep/types';
import React, { useState, useEffect } from 'react';

import { ProductItem } from './components/product/Product';
import { TopBar } from './components/topBar/TopBar';

const filterByLetter = (arr: SklepTypes['getProducts200Response']['data'], value: string) =>
  arr.filter((item) => item.name.toLowerCase().slice(0, value.length) === value.toLowerCase());

type ProductCollectionProps = {
  readonly products: SklepTypes['getProducts200Response']['data'];
};

export const ProductCollection = React.memo<ProductCollectionProps>(({ products }) => {
  const [items, setItems] = useState(products);
  const [inputValue, setInputValue] = useState('');

  const handleSetInputValue = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    setItems(filterByLetter(products, inputValue));
  }, [products, inputValue]);

  return (
    <section className="bg-white worksans p-8 container mx-auto flex items-center flex-wrap">
      <TopBar handleSetInputValue={handleSetInputValue} />
      {items.length ? (
        <>
          {items.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
        </>
      ) : (
        <p className="px-6 mt-4">Nie ma takiego produktu...</p>
      )}
    </section>
  );
});
ProductCollection.displayName = 'ProductCollection';
