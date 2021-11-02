export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  active: string;
  likes_count: string;
  likes_up_count: string;
  likes_down_count: string;
  published_at: string;
  master: {
    id: string;
    sku: string;
    price: string;
    promotional_price: string;
    stock: string;
    weight: string;
    height: string;
    width: string;
    depth: string;
    is_master: string;
    position: string;
  };
  category: {
    id: string;
    slug: string;
    name: string;
  };
  image: {
    id: string;
    url: string;
  };
}
