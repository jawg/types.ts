/// <reference types="geojson" />
/// <reference types="leaflet" />
/// <reference types="mapbox-gl" />
/// <reference types="maplibre-gl" />

declare class AbstractPlaces {
  constructor(options: JawgPlaces.JawgPlacesOptions);
  /**
   * Search a random text or lat/lon using Jawg Places.
   * All features are points with properties, more details on our [documentation](https://www.jawg.io/docs/apidocs/places/response)+.
   *
   * @param text to search using Jawg Places
   * @returns promise with the feature collection received from Jawg Places
   */
  search(text: string): Promise<JawgPlaces.FeatureCollection>;
  /**
   * Submit the search using the value of the `<input>`. This will trigger {@link JawgPlacesOptions.onFeatures}.
   */
  submit(): void;
  /**
   * @returns The value of the `<input>`.
   */
  getValue(): string;
  /**
   * @param value The new value for the `<input>`.
   */
  setValue(value: string): void;
  /**
   * Open the result list with the error message. This will trigger {@link JawgPlacesOptions.onError}.
   * @param error The error to show, can be a string or an object.
   */
  showError(error: any): void;
  /**
   * Open the result list with elements from the FeatureCollection. We use the `properties.label` field of each features.
   * This will trigger {@link JawgPlacesOptions.onFeatures}.
   * @param results Feature Collection of geocoded points.
   */
  showResults(results: JawgPlaces.FeatureCollection): void;
  /**
   * Close the result list.
   */
  close(): void;
}

declare namespace JawgPlaces {
  /**
   * Representation of geographic coordinate using the spatial reference World Geodetic System (WSG84, also known as EPSG:4326).
   */
  interface LatLon {
    lat: number;
    lon: number;
  }

  /**
   * Option to activate reverse geocoding.
   */
  interface ReverseOptions {
    enabled: boolean;
    /**
     * Radius over the point in meters.
     */
    radius?: number;
  }

  interface CircleOptions extends LatLon {
    radius: number;
  }

  interface RectangleOptions {
    min: LatLon;
    max: LatLon;
  }

  interface BoudaryOptions {
    countries: string[] | string;
    circle: CircleOptions;
    rectangle: RectangleOptions;
  }

  type Feature = GeoJSON.Feature<GeoJSON.Point>;
  type FeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Point>;

  interface JawgPlacesOptions {
    accessToken?: string;
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

  interface LeafletTransitionOptions {
    type?: 'hybrid' | 'fly' | 'jump';
  }

  interface MapGLTransitionOptions {
    type?: 'hybrid' | 'fly' | 'jump';
    flyCurve?: number;
    flySpeed?: number;
  }

  interface AdminAreaOptions {
    show: boolean;
    fillColor?: string;
    outlineColor?: string;
  }

  interface MapGLMarkerOptions {
    show: boolean | 'all';
    icon?: string;
    anchor?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    iconUrl?: string;
  }

  interface LeafletMarkerOptions {
    show: boolean | 'all';
    icon?: L.Icon;
  }

  interface JawgPlacesInputOptions extends JawgPlacesOptions {
    input: string | HTMLElement;
    resultContainer?: string | HTMLElement;
  }

  interface JawgPlacesMaplibreOptions extends JawgPlacesInputOptions {
    placeholder?: string;
    inputClasses?: string;
    adminArea?: AdminAreaOptions;
    marker?: MapGLMarkerOptions;
    transition?: MapGLTransitionOptions;
  }

  interface JawgPlacesLeafletOptions extends JawgPlacesInputOptions {
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

  class Input extends AbstractPlaces {
    constructor(options: JawgPlacesInputOptions);
  }

  class MapLibre extends AbstractPlaces {
    constructor(options: JawgPlacesMaplibreOptions);
    onAdd(map: mapboxgl.Map): void;
    attachMap(map: mapboxgl.Map): MapLibre | Mapbox;
    getDefaultPosition(): 'top-left';
  }

  class Mapbox extends MapLibre {}

  class Leaflet extends AbstractPlaces {
    constructor(options: JawgPlacesLeafletOptions);
    onAdd(map: L.Map): void;
    getPosition(): string;
    addTo(map: L.Map): void;
    attachMap(map: L.Map): Leaflet;
  }

  const version: number;

  function attributions(): HTMLElement;
}

export { JawgPlaces };
