export type AreaPolygon = {
  geometry: L.Polygon<L.LatLngLiteral> | null;
  drawable: boolean;
  active: boolean;
};

export type CirclePolygon = {
  geometry: L.Circle | null;
  drawable: boolean;
  active: boolean;
  center: Object;
};

export type FilePolygon = {
  geometry: L.GeoJSON | null;
  active: boolean;
};
