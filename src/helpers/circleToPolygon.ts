import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';

export default function circleToPolygon(circle: L.Circle) {
  return L.PM.Utils.circleToPolygon(circle, 60);
}