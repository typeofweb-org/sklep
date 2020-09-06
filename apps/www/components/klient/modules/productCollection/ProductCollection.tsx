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
    isSearchVisible && 'border border-gray-600 rounded-md shadow-sd mr-2 w-auto px-2 h-8 ml-4',
  );

  const searchStylesMobile = clsx(
    'md:hidden h-0 w-full',
    isSearchVisible && 'border border-gray-600 rounded-md shadow-sd h-10 mx-6 px-2',
  );

  const sortStylesDesktop = clsx(
    'hidden md:block w-0',
    isSortVisible && 'border border-gray-600 rounded-md shadow-sd mr-2 w-auto px-2 h-8',
  );

  const sortStylesMobile = clsx(
    'md:hidden h-0 w-full',
    isSortVisible && 'border border-gray-600 rounded-md shadow-sd h-10 my-4 mx-6',
  );

  return (
    <section className="bg-white work-sans py-8">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <header className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <h3 className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
              STORE
            </h3>
            <div className="flex items-center">
              <FilterSelect
                products={products}
                setSortedProducts={setSortedProducts}
                isSortVisible={isSortVisible}
                styles={sortStylesDesktop}
              />
              <button
                onClick={handleSortVisible}
                className="pl-3 inline-block no-underline text-gray-600 hover:text-black"
              >
                <svg
                  className="fill-current hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                </svg>
              </button>
              <input type="text" className={searchStylesDesktop} placeholder="Search" />
              <button
                onClick={handleSearchVisible}
                className="pl-3 inline-block no-underline text-gray-600 hover:text-black"
              >
                <svg
                  className="fill-current hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <FilterSelect
          products={products}
          setSortedProducts={setSortedProducts}
          isSortVisible={isSortVisible}
          styles={sortStylesMobile}
        />
        <input type="text" id="searchInput" className={searchStylesMobile} placeholder="Search" />
        {sortedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
});
ProductCollection.displayName = 'ProductCollection';
