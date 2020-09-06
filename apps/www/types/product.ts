// todo: correct it
export type Product = {
  id: number;
  name: string;
  description?: string;
  slug?: string;
  isPublic: boolean;
  regularPrice: number;
  discountPrice?: number;
  productType?: string;
};
