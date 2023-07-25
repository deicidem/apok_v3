export interface Config {
  id: number;
  name: string;
  value: string;
  description: string;
  type: string;
}

export interface ConfigsMap {
  [key: string]: Config;
}
