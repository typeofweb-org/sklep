import React from 'react';
import Slugify from 'slugify';

export const ProductSlug = ({ name }: { name: string }) => {
  return <span>{Slugify(name)}</span>;
};
