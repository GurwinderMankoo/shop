export type ProductImage = {
  id: string;
  url: string;
  altText: string | null;
};


export type VariantOption = {
  id: string;
  name: string;
  value: string;
};


export type ProductVariant = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;

  options?: VariantOption[];
};


export type Product = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  description: string | null;

  images: ProductImage[];

  variants: ProductVariant[];

  category?: Partial<Category> | null;

  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  products: Product[];
}