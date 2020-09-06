import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaSort } from 'react-icons/fa';

import { Product } from '../../../../types/product';

import FilterSelect from './filterSelect/FilterSelect';
import { ProductItem } from './product/Product';

type ProductCollectionProps = {
  products: Product[];
};

export const ProductCollection = React.memo<ProductCollectionProps>(({ products }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [sortedProducts, setSortedProducts] = useState(products);

  function handleSearchVisible() {
    setIsSearchVisible((prevState) => !prevState);
  }

  function handleSortVisible() {
    setIsSortVisible((prevState) => !prevState);
  }

  const searchStylesDesktop = clsx(
    'hidden md:block w-0',
    isSearchVisible && 'border border-gray-600 rounded-md shadow-sd mr-2 w-auto px-2 h-8',
  );

  const searchStylesMobile = clsx(
    'md:hidden h-0 w-full px-2',
    isSearchVisible && 'border border-gray-600 rounded-md shadow-sd h-10',
  );

  const sortStylesDesktop = clsx(
    'hidden md:block w-0',
    isSortVisible && 'border border-gray-600 rounded-md shadow-sd mr-2 w-auto px-2 h-8',
  );

  const sortStylesMobile = clsx(
    'md:hidden h-0 w-full',
    isSortVisible && 'border border-gray-600 rounded-md shadow-sd h-10 my-4',
  );

  const productListStyles = clsx(
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8',
    isSearchVisible && 'mt-4 md:mt-0',
  );

  const headerStyles = clsx(
    'flex justify-between items-center mt-4 py-0 md:py-4 border-b border-gray-700 md:border-0',
    (isSearchVisible || isSortVisible) && 'border-b border-gray-700',
  );

  return (
    <section className="w-full p-4">
      <header className={headerStyles}>
        <h3 className="text-2xl font-bold">STORE</h3>
        <div className="flex items-center">
          <FilterSelect
            products={products}
            setSortedProducts={setSortedProducts}
            isSortVisible={isSortVisible}
            styles={sortStylesDesktop}
          />
          <button onClick={handleSortVisible}>
            <FaSort className="w-6 h-6 mr-2 text-gray-700" />
          </button>
          <input type="text" className={searchStylesDesktop} placeholder="Search" />
          <button onClick={handleSearchVisible}>
            <BiSearch className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </header>
      <FilterSelect
        products={products}
        setSortedProducts={setSortedProducts}
        isSortVisible={isSortVisible}
        styles={sortStylesMobile}
      />
      <input type="text" id="searchInput" className={searchStylesMobile} placeholder="Search" />
      <div className={productListStyles}>
        {sortedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
});
ProductCollection.displayName = 'ProductCollection';
