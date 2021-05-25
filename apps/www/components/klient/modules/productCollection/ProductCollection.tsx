import type { SklepTypes } from '@sklep/types';
import React, { useState, useMemo } from 'react';

import { ProductItem } from './components/product/Product';
import { TopBar } from './components/topBar/TopBar';

const filterByLetter = (arr: SklepTypes['getProducts200Response']['data'], value: string) =>
  value ? arr.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())) : arr;

type ProductCollectionProps = {
  readonly products: SklepTypes['getProducts200Response']['data'];
};

export const ProductCollection = React.memo<ProductCollectionProps>(({ products }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSetInputValue = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setInputValue(e.target.value);
  }, []);

  const filteredProducts = useMemo(() => filterByLetter(products, inputValue), [
    products,
    inputValue,
  ]);

  return (
    <section className="bg-white worksans p-8 container mx-auto flex items-center flex-wrap">
      <TopBar handleSetInputValue={handleSetInputValue} />
      {filteredProducts.length ? (
        filteredProducts.map((product) => <ProductItem key={product.id} product={product} />)
      ) : (
        <p className="px-6 mt-4">Nie ma takiego produktu...</p>
      )}
    </section>
  );
});
ProductCollection.displayName = 'ProductCollection';
