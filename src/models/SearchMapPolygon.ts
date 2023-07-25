import * as L from 'leaflet';

export interface AreaPolygon {
  geometry: L.LatLngLiteral[];
  drawable: boolean;
  active: boolean;
}

export interface CirclePolygon {
  geometry: L.Circle | null;
  drawable: boolean;
  active: boolean;
  center: Object;
}

export interface FilePolygon {
  geometry: L.GeoJSON | null;
  active: boolean;
}
