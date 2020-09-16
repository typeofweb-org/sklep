// todo: correct it
export type Product = {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly slug?: string;
  readonly isPublic: boolean;
  readonly regularPrice: number;
  readonly discountPrice?: number;
  readonly productType?: string;
};
