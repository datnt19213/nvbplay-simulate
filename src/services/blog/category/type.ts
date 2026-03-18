export interface Categories {
  status: string;
  code: number;
  data: Category[];
  message: string;
}

export interface Category {
  name: string;
  slug: string;
}
