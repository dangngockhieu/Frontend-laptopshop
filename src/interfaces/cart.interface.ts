export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  number: number;
  quantity: number;
  imageUrl: string;
  selected?: boolean;
}

export interface Item{
  id: number,
  number: number,
  price: number,
  name: string,
  imageUrl: string
}