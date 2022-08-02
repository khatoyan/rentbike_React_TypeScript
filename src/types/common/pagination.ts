export interface IPagination<T> {
  itemsInPage: T[];
  hasMore: boolean;
  pages: number;
  totalItems: number;
}
