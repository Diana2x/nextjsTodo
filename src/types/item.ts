export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
}

export type CreateItemData = Omit<Item, 'id' | 'createdAt'>;
export type UpdateItemData = Partial<CreateItemData>;
