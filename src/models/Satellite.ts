export interface Satellite {
  id: number;
  name: string;
  version: string;
  type: string;
  typeId: number;
}

export interface SatellitesMap {
  [key: string]: Satellite;
}
