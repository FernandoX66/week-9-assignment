export interface ProductToAdd {
  data: {
    items: Item[];
  };
}

export interface Item {
  product_variant_id: number;
  quantity: number;
}
