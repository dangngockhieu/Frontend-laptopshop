export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderDTO {
  recipientName: string;
  address: string;
  phone: string;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: string;
}

export interface ProductDTO {
  productId: number;
}
export interface OrderDTO {
  products: ProductDTO[];
}

export interface OrderState {
  orderId: number,
  userId: number,
  recipientName: string,
  address: string,
  phone: string,
  totalPrice: number,
  orderStatus: string,
  orderDate: string,
  trackingCode: string,
  deliveryDate: string,
  expectedDate: string | null,
  receivedDate: string,
  paymentMethod: string,
  paymentStatus: string,
  userEmail: string
}

export interface OrderViewDetail{
  productId: number,
  name: string,
  quantity: number,
  unitPrice: number,
  imageUrl: string | null
}

export interface ProductInOrder{
  productId: number,
  productName: string,
  orderItemId: number,
  quantity: number,
  unitPrice: number,
  reviewed: boolean,
  imageUrl: string | null
}

export interface HistoryOrder{
  orderId: number,
  totalPrice: number,
  status: string,
  orderDate: string,
  paymentMethod: string,
  paymentStatus: string,
  products: ProductInOrder[]
}

