export interface Pagination {
  currentPage: number;
  totalPages: number;
  first: number;
  last: number;
  prev: number | null;
  next: number | null;
  total: number;
}
