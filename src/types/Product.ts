export interface Product {
  id: number;
  name: string;
  quantity: number;
  category: string;
  unitMeasure: string | null;
  validationDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type NewProduct = Omit<Product, 'id'>;