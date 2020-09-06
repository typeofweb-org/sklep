import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { Product } from '../../../../../types/product';

enum sortedOptions {
  all = 'FEATURED',
  alphaAsc = 'ALPHA_INCREASE',
  alphaDesc = 'ALPHA_DECREASE',
  priceAsc = 'PRICE_INCREASE',
  priceDesc = 'PRICE_DECREASE',
}

interface FilterSelectProps {
  setFilterOption: React.Dispatch<React.SetStateAction<string>>;
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  isSortVisible: boolean;
  styles: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  isSortVisible,
  styles,
  products,
  setSortedProducts,
}) => {
  const [filterOption, setFilterOption] = useState<string>(sortedOptions.all);
  useEffect(() => {
    function changeSort(filterOption: string) {
      switch (filterOption) {
        case sortedOptions.all:
          return setSortedProducts(products);
        case sortedOptions.priceAsc:
          let sortedPriceAsc = [...products].sort((a, b) => {
            if (a.regularPrice > b.regularPrice) return 1;
            if (a.regularPrice < b.regularPrice) return -1;
            return 0;
          });
          return setSortedProducts(sortedPriceAsc.slice());

        case sortedOptions.priceDesc:
          let sortedPriceDesc = [...products].sort((a, b) => {
            if (a.regularPrice < b.regularPrice) return 1;
            if (a.regularPrice > b.regularPrice) return -1;
            return 0;
          });
          return setSortedProducts(sortedPriceDesc.slice());
        case sortedOptions.alphaAsc:
          let sortedAlphaAsc = [...products].sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
          return setSortedProducts(sortedAlphaAsc.slice());
        case sortedOptions.alphaDesc:
          let sortedAlphaDesc = [...products].sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          });
          return setSortedProducts(sortedAlphaDesc.slice());
      }
    }
    changeSort(filterOption);
  }, [products, filterOption, setSortedProducts]);

  function handleChangeSort(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setFilterOption(e.target.value);
  }

  return (
    <select name="sort" id="sort" className={styles} onChange={(e) => handleChangeSort(e)}>
      <option value={sortedOptions.all}>Featured</option>
      <option value={sortedOptions.priceAsc}>Price, low to high</option>
      <option value={sortedOptions.priceDesc}>Price, high to low</option>
      <option value={sortedOptions.alphaAsc}>Alphabetically, A-Z</option>
      <option value={sortedOptions.alphaDesc}>Alphabetically, Z-A</option>
    </select>
  );
};

export default FilterSelect;
