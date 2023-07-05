export type Config = {
  id: number;
  name: string;
  value: string;
  description: string;
  type: string;
};

export type ConfigsMap = {
  [key: string]: Config;
};
