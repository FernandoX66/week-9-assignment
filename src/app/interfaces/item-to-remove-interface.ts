export interface ItemToRemove {
  data: {
    items: Item[];
  };
}

export interface Item {
  id: string;
  _destroy: boolean;
}
