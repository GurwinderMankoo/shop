import { Decimal } from "@prisma/client/runtime/library";

export type ProductImage = {
  id: string;
  url: string;
  altText: string | null;
};

export type ProductOptionValue = {
  id: string;
  value: string;
};

export type ProductOption = {
  id: string;
  name: string;

  values: ProductOptionValue[];
};

export type ProductVariantOptionValue = {
  variantId: string;
  optionValueId: string;

  optionValue: {
    id: string;
    value: string;
    option: {
      id: string;
      name: string;
    };
  };
};

export type ProductVariant = {
  id: string;
  name: string;
  sku: string;

  price: Decimal | number | null;
  comparePrice: Decimal | number | null;
  stock: number;

  optionValues: ProductVariantOptionValue[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;

  imageUrl: string | null;
  description: string | null;

  isActive: boolean;
  minPrice: Decimal | number | null;

  images: ProductImage[];

  options: ProductOption[];

  variants: ProductVariant[];

  category: Pick<Category, "id" | "name" | "slug"> | null;

  createdAt: Date;
  updatedAt: Date;
};

export type Review = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    image: string | null;
  };
};

export type Category = {
  id: string;
  name: string;
  slug: string;

  description: string | null;
  imageUrl: string | null;

  products: Product[];
};