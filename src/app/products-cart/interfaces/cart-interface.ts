export interface Cart {
  id: string;
  user_id: string;
  number: string;
  status: string;
  total: string;
  total_items: string;
  completed_at: string;
  created_at: string;
  items: Item[];
}

export interface Item {
  id: string;
  quantity: string;
  product_variant_id: string;
  product_id: string;
  order_id: string;
  total: string;
  price: string;
  name: string;
  description: string;
  promotion: string;
}
