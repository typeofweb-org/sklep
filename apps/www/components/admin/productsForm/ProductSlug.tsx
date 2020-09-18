import React from 'react';
import Slugify from 'slugify';

export const ProductSlug = ({ name }: { readonly name: string }) => {
  return <span>{Slugify(name)}</span>;
};
