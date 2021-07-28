import { Map as MapboxGLMap } from 'mapbox-gl';
import { Map as MapLibreGLMap } from 'maplibre-gl';
import L = require('leaflet');
import { JawgPlaces } from '../';

new JawgPlaces.Input({ input: '', accessToken: '<Access-Token>' });
new JawgPlaces.MapLibre({ input: '', accessToken: '<Access-Token>' }).attachMap(new MapLibreGLMap());
new JawgPlaces.Mapbox({ input: '', accessToken: '<Access-Token>' }).attachMap(new MapboxGLMap());
new JawgPlaces.Leaflet({ input: '', accessToken: '<Access-Token>', L }).attachMap(new L.Map('my-map'));
