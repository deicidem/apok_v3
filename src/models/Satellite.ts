export type Satellite = {
  id: number;
  name: string;
  version: string;
  type: string;
  typeId: number;
};

export type SatellitesMap = {
  [key: string]: Satellite;
};
