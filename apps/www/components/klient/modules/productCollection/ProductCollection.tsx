import clsx from 'clsx';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaSort } from 'react-icons/fa';

import { Product } from '../../../../types/product';

import { ProductItem } from './product/Product';

type ProductCollectionProps = {
  products: Product[];
};

export const ProductCollection = React.memo<ProductCollectionProps>(({ products }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);

  function handleSearchVisible() {
    setIsSearchVisible((prevState) => !prevState);
  }

  function handleSortVisible() {
    setIsSortVisible((prevState) => !prevState);
  }

  const searchStylesDesktop = clsx(
    'hidden md:block w-0',
    isSearchVisible && 'border border-gray-700 rounded-sm mr-2 w-auto px-2',
  );

  const searchStylesMobile = clsx(
    'md:hidden h-0 w-full px-2',
    isSearchVisible && 'border border-gray-700 rounded-sm h-10',
  );

  const sortStylesDesktop = clsx(
    'hidden md:block w-0',
    isSortVisible && 'border border-gray-700 rounded-sm mr-2 w-auto px-2',
  );

  const sortStylesMobile = clsx(
    'md:hidden h-0 w-full',
    isSortVisible && 'border border-gray-700 rounded-sm h-10 mb-4',
  );

  const productListStyles = clsx(
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8',
    isSearchVisible && 'mt-8 md:mt-0',
  );

  return (
    <article className="w-full p-4">
      <header className="flex justify-between items-center mt-4 md:py-4">
        <h3 className="text-2xl font-bold">STORE</h3>
        <div className="flex items-center">
          <select name="sort" id="sort" className={sortStylesDesktop}>
            <option value="">Featured</option>
            <option value="">Price, low to high</option>
            <option value="">ss</option>
          </select>
          <button onClick={handleSortVisible}>
            <FaSort className="w-6 h-6 mr-2 text-gray-700" />
          </button>
          <input type="text" className={searchStylesDesktop} placeholder="Search" />
          <button onClick={handleSearchVisible}>
            <BiSearch className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </header>
      <select name="sort" id="sort" className={sortStylesMobile}>
        <option value="">Featured</option>
        <option value="">Price, low to high</option>
        <option value="">ss</option>
      </select>
      <input type="text" className={searchStylesMobile} placeholder="Search" />
      <div className={productListStyles}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </article>
  );
});
ProductCollection.displayName = 'ProductCollection';
