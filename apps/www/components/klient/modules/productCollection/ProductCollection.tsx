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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleSearchOpen() {
    setIsSearchOpen((prevState) => !prevState);
  }

  const searchStyles = clsx(
    'absolute left-0 bottom-0 md:static h-0 md:h-auto w-auto md:w-0',
    isSearchOpen &&
      'border border-gray-700 rounded-sm mr-0 md:mr-2 w-full md:w-auto mt-2 md:mt-0  px-2 py-6 md:py-0 top-20',
  );

  const productListStyles = clsx(
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8',
    isSearchOpen && 'mt-8 md:mt-0',
  );

  const headerStyles = clsx(
    'flex justify-between items-center pb-6 relative',
    isSearchOpen && 'pb-16 md:pb-6',
  );

  return (
    <article className="w-full p-4">
      <header className={headerStyles}>
        <h3 className="text-2xl font-bold">STORE</h3>
        <div className="flex items-center">
          <FaSort className="w-6 h-6 mr-2 text-gray-700" />
          <input type="text" className={searchStyles} placeholder="Search" />
          <button onClick={handleSearchOpen}>
            <BiSearch className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </header>
      <div className={productListStyles}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </article>
  );
});
ProductCollection.displayName = 'ProductCollection';
