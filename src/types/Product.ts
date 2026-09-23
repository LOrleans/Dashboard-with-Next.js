export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export type NewProduct = Omit<Product, 'id'>;