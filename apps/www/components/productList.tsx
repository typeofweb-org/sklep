import React from "react";

type Product = {
  id: number;
  name: string;
  description?: string | null;
  slug?: string | null;
  isPublic: boolean;
  regularPrice: number;
  discountPrice?: number | null;
  productType?: string | null;
};

export const ProductList = (products) => {
  const ProductRow = ({
    id,
    name,
    description,
    slug,
    isPublic,
    regularPrice,
    discountPrice,
    productType,
  }: Product) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{slug}</td>
        <td>{isPublic}</td>
        <td>{regularPrice}</td>
        <td>{discountPrice}</td>
        <td>{productType}</td>
      </tr>
    );
  };

  const productTable = products.map((item: Product) => ProductRow(item));

  return (
    <div className="productTable">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Slug</th>
            <th>Is Public</th>
            <th>Regular Price</th>
            <th>Discount Price</th>
            <th>Product Type</th>
          </tr>
        </thead>
        <tbody>{productTable}</tbody>
      </table>
    </div>
  );
};