/// <reference types="geojson" />
/// <reference types="leaflet" />
/// <reference types="mapbox-gl" />
/// <reference types="maplibre-gl" />
export as namespace JawgPlaces;

/**
 * Representation of geographic coordinate using the spatial reference World Geodetic System (WSG84, also known as EPSG:4326).
 */
export interface LatLon {
  lat: number;
  lon: number;
}

/**
 * Option to activate reverse geocoding.
 */
export interface ReverseOptions {
  enabled: boolean;
  /**
   * Radius over the point in meters.
   */
  radius?: number;
}

export interface CircleOptions extends LatLon {
  radius: number;
}
export interface RectangleOptions {
  min: LatLon;
  max: LatLon;
}

export interface BoudaryOptions {
  countries: string[] | string;
  circle: CircleOptions;
  rectangle: RectangleOptions;
}

export type Feature = GeoJSON.Feature<GeoJSON.Point>;
export type FeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Point>;

export interface JawgPlacesOptions {
  accessToken: string;
  language?: string;
  searchOnTyping?: boolean;
  layers?: string[] | string;
  sources?: string[] | string;
  focusPoint?: LatLon | (() => LatLon);
  boundary?: BoudaryOptions;
  showResultIcons?: boolean;
  clearCross?: boolean;
  size?: number;
  reverse?: ReverseOptions;
  onFeatures?: (features: Feature[]) => void;
  onClose?: () => void;
  onClick?: (feature: Feature) => void;
  onError?: (error: any) => void;
  onClear?: () => void;
}

declare class JawgPlaces {
  constructor(options: JawgPlacesOptions);
  search(text: string): Promise<FeatureCollection>;
  submit(): void;
  getValue(): string;
  setValue(value: string): void;
  showError(error: any): void;
  showResults(results: FeatureCollection): void;
  close(): void;
}

export interface LeafletTransitionOptions {
  type?: 'hybrid' | 'fly' | 'jump';
}

export interface MapGLTransitionOptions {
  type?: 'hybrid' | 'fly' | 'jump';
  flyCurve?: number;
  flySpeed?: number;
}

export interface AdminAreaOptions {
  show: boolean;
  fillColor?: string;
  outlineColor?: string;
}

export interface MapGLMarkerOptions {
  show: boolean | 'all';
  icon?: string;
  anchor?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  iconUrl?: string;
}

export interface LeafletMarkerOptions {
  show: boolean | 'all';
  icon?: L.Icon;
}

export interface JawgPlacesInputOptions extends JawgPlacesOptions {
  input: string | HTMLElement;
  resultContainer?: string | HTMLElement;
}

export interface JawgPlacesMaplibreOptions extends JawgPlacesInputOptions {
  placeholder?: string;
  inputClasses?: string;
  adminArea?: AdminAreaOptions;
  marker?: MapGLMarkerOptions;
  transition?: MapGLTransitionOptions;
}

export interface JawgPlacesLeafletOptions extends JawgPlacesInputOptions {
  placeholder?: string;
  inputClasses?: string;
  adminArea?: AdminAreaOptions;
  marker?: LeafletMarkerOptions;
  transition?: LeafletTransitionOptions;
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  /**
   * The Leaflet instance for marker creation
   */
  L: any;
}

declare class Input extends JawgPlaces {
  constructor(options: JawgPlacesInputOptions);
}

declare class MapLibre extends JawgPlaces {
  constructor(options: JawgPlacesMaplibreOptions);
  onAdd(map: mapboxgl.Map): void;
  attachMap(map: mapboxgl.Map): MapLibre | Mapbox;
  getDefaultPosition(): 'top-left';
}

type Mapbox = MapLibre;

declare class Leaflet extends JawgPlaces {
  constructor(options: JawgPlacesLeafletOptions);
  onAdd(map: L.Map): void;
  getPosition(): string;
  addTo(map: L.Map): void;
  attachMap(map: L.Map): Leaflet;
}

declare const version: number;

declare function attributions(): HTMLElement;

export { Input, MapLibre, Mapbox, Leaflet, version, attributions };
