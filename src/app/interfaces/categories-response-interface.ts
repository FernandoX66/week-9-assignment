export interface CategoriesResponse {
  data: Category[];
}

export interface Category {
  id: number;
  slug: string;
  name: string;
}
