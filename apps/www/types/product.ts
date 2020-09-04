// todo: correct it
export type Product = {
  id: number;
  name: string;
  description?: string | null;
  slug?: string | null;
  isPublic: boolean;
  regularPrice: number;
  discountPrice?: number | null;
  productType?: string | null;
};
