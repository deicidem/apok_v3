export type Alert = {
  id: number;
  theme: 'error' | 'success' | 'info';
  title: string;
  message: string;
};
