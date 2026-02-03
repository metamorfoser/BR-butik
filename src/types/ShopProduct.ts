export type ShopProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description?: string;
  originalCategory: string;
  link?: string;

};

export type CartItem = ShopProduct & {
  quantity: number;
};
