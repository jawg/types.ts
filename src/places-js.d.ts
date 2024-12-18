/// <reference types="geojson" />
/// <reference types="mapbox-gl" />
/// <reference types="maplibre-gl" />

import L = require('leaflet');

declare class AbstractPlaces {
  constructor(options: JawgPlaces.JawgPlacesOptions);
  /**
   * Search a random text or lat/lon using Jawg Places.
   *
   * All features are points with properties, more details on our [documentation](https://www.jawg.io/docs/apidocs/places/response).
   *
   * See {@link JawgPlacesOptions.reverse} for lat/lon search.
   *
   * @param text The text to search using Jawg Places
   * @returns A promise with the feature collection received from Jawg Places
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
  /**
   * Clear created DOM elements and listeners.
   * This could be usefull when you recreate a JawgPlace object for the same input.
   */
  destroy(): void;
}

/**
 * Welcome to Jawg Places type documentation.
 * Checkout our examples on our [documentation website](https://www.jawg.io/docs/integration/places-js/) and the source code on [GitHub](https://github.com/jawg/places-js-examples).
 */
declare namespace JawgPlaces {
  /**
   * Representation of geographic coordinate using the spatial reference World Geodetic System (WSG84, also known as EPSG:4326).
   */
  interface LatLon {
    /**
     * The latitude, geographic coordinate that specifies the north-south position of a point on the Earth's surface.
     */
    lat: number;
    /**
     * The longitude, geographic coordinate that specifies the east-west position of a point on the Earth's surface.
     */
    lon: number;
  }

  /**
   * Option to activate reverse geocoding within the input.
   * You can paste coordinates in the form {lat}/{lon} in the input.
   * The separation can be either `/` (slash), `,` (comma) or ` ` (space).
   * ```javascript
   * new JawgPlaces({
   *   reverse: {
   *     enabled: true,
   *     radius: 50
   *   }
   * })
   * ```
   */
  interface ReverseOptions {
    /**
     * Enable reverse geocoding in input.
     */
    enabled: boolean;
    /**
     * Radius over the point in meters.
     */
    radius?: number;
  }

  interface CircleOptions extends LatLon {
    /**
     * Radius over the point in meters.
     */
    radius: number;
  }

  /**
   * Options to search within a rectangular region.
   */
  interface RectangleOptions {
    /**
     * The minimum latitude and logitude of the rectangle.
     */
    min: LatLon;
    /**
     * The maximum latitude and longitude of the rectangle.
     */
    max: LatLon;
  }

  /**
   * Set of options when you are looking for places in a particular region.
   * ```javascript
   * new JawgPlaces({
   *   boundaries: {
   *     countries: 'fra',
   *     point: { lat: 0, lon: 0 },
   *     gids: ['whosonfirst:locality:101751119']
   *   }
   * })
   * ```
   */
  interface BoudaryOptions {
    /**
     * Add a restriction by alpha-2 or alpha-3 ISO-3166 country code. Countries can be static or dynamic with the function.
     */
    countries?: string[] | string | (() => string[]) | (() => string);
    /**
     * Search within a circular region. Circle can be static or dynamic with the function.
     */
    circle?: CircleOptions | (() => CircleOptions);
    /**
     * Add a restriction by GIDs. GIDs can be static or dynamic with the function.
     */
    gids?: string[] | string | (() => string[]) | (() => string);
    /**
     * Search within a rectangular region. Rectangle can be static or dynamic with the function.
     */
    rectangle?: RectangleOptions | (() => RectangleOptions);
  }

  /**
   * Set of options when you want to prioritize places from particular region.
   * ```javascript
   * new JawgPlaces({
   *   focus: {
   *     countries: 'fra',
   *     point: { lat: 0, lon: 0 },
   *     gids: ['whosonfirst:locality:101751119']
   *   }
   * })
   * ```
   */
  interface FocusOptions {
    /**
     * Add a priorities by alpha-2 or alpha-3 ISO-3166 country code. Countries can be static or dynamic with the function.
     */
    countries?: string[] | string | (() => string[]) | (() => string);
    /**
     * Sort results in part by their proximity to the given coordinate. Coordinates can be static or dynamic with the function.
     */
    point?: LatLon | (() => LatLon);
    /**
     * Add a priorities by Jawg GIDs. GIDs can be static or dynamic with the function.
     */
    gids?: string[] | string | (() => string[]) | (() => string);
  }

  type GeometriesOptions = 'point' | 'source';

  /**
   * Option to activate Place Details within the input.
   * You can paste one or many GIDs in the input.
   * ```javascript
   * new JawgPlaces({
   *   place: {
   *     enabled: true,
   *     geometries: 'source'
   *   }
   * })
   * ```
   */
  interface PlaceOptions {
    /**
     * Activate the place endpoint.
     */
    enabled: boolean;
    /**
     * Set the type of return from Places Details API, either a point or the source geometry.
     */
    geometries?: GeometriesOptions | (() => GeometriesOptions);
  }

  /**
   * Type of geometries used by Jawg Places API.
   */
  type Feature = GeoJSON.Feature<GeoJSON.Point>;
  /**
   * Return type of Jawg Places API.
   */
  type FeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Point>;
  /**
   * All available layers.
   */
  type Layer =
    | 'address'
    | 'venue'
    | 'neighbourhood'
    | 'locality'
    | 'borough'
    | 'localadmin'
    | 'county'
    | 'macrocounty'
    | 'region'
    | 'macroregion'
    | 'country'
    | 'coarse'
    | 'postalcode'
    | 'island'
    | string;

  /**
   * All available sources.
   */
  type Source =
    | 'wof'
    | 'whosonfirst'
    | 'oa'
    | 'openaddresses'
    | 'osm'
    | 'openstreetmap'
    | 'gn'
    | 'geonames'
    | 'jawg'
    | string;

  /**
   * Basic options for Places JS.
   * ```javascript
   * new JawgPlaces({
   *   accessToken: '<Access-Token>',
   *   input: '#my-input'
   * })
   * ```
   */
  interface JawgPlacesOptions {
    /**
     * Your personal access token, create your own on the [Jawg Lab](https://www.jawg.io/lab).
     * This is filled automatically when you get the library with our CDN.
     */
    accessToken?: string;
    /**
     * The `<input>` to transform into a geocoding search bar.
     * This can be either a id (e.g `#my-input`), class selector (e.g `.my-input`) or the [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
     * With some frameworks/UI libs such as React, you can't use the ref here.
     */
    input?: string | HTMLElement;
    /**
     * The custom `<div>` that will contain the geocoding results.
     * By default the container is created by Jawg Places JS.
     * With some frameworks/UI libs such as React, you can't use the ref here.
     */
    resultContainer?: string | HTMLElement;
    /**
     * Return results in a specific language using [BCP47 standard](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) (e.g 'en', 'fr', 'de', ...).
     * By default, we use HTTP Header set by the browser and English when not present.
     * Language can be static or dynamic with the function.
     */
    language?: string | (() => string);
    /**
     * Set this to `true` to activate search on typing, this will also use `autocomplete` search.
     * Default value is `false`, you will need to press `Enter` to validate your search.
     */
    searchOnTyping?: boolean;
    /**
     * Set the minimum number of characters to trigger a geocoding request.
     * If you press `Enter` the search will be validated even if the length is not reached.
     * This option work only when `searchOnTyping=true`.
     * Default value is `0`.
     */
    minLength?: number;
    /**
     * Set the number of milliseconds to wait before a search validation.
     * If you press `Enter` the search will be immediately validated.
     * This option work only when `searchOnTyping=true`.
     * Default value is `350`.
     */
    debounceDelay?: number;
    /**
     * Filter the kind of place you want to find. Layers can be static or dynamic with the function.
     */
    layers?: Layer[] | Layer | (() => Layer) | (() => Layer[]);
    /**
     * Filter the originating source of the data. Sources can be static or dynamic with the function.
     */
    sources?: Source[] | Source | (() => Source[]) | (() => Source);
    /**
     * See {@link FocusOptions.point}
     */
    focusPoint?: LatLon | (() => LatLon);
    /** {@inheritDoc FocusOptions} */
    focus?: FocusOptions;
    /** {@inheritDoc BoudaryOptions} */
    boundary?: BoudaryOptions;
    /**
     * {@inheritDoc PlaceOptions}
     * @defaultValue false
     */
    place?: PlaceOptions | boolean;
    /**
     * Show icon at the left each results.
     */
    showResultIcons?: boolean;
    /**
     * Add a clear cross in the right side of the input.
     */
    clearCross?: boolean;
    /**
     * Set the default number of results. Default value is 10.
     */
    size?: number;
    /**
     * {@inheritDoc ReverseOptions}
     * @defaultValue false
     */
    reverse?: ReverseOptions | boolean;
    /**
     * Set a custom message when no results are found. This can be disabled.
     */
    noResultsMessage?: string | false;
    /**
     * Callback triggered when Jawg Places API returns without error.
     * @param features The list of features returned by Jawg Places API
     */
    onFeatures?: (features: Feature[]) => void;
    /**
     * Callback triggered when the result list is closed/cleared.
     */
    onClose?: () => void;
    /**
     * Callback triggered when the user click on a result.
     * @param feature The feature selected by the user
     */
    onClick?: (feature: Feature) => void;
    /**
     * Callback triggered when Jawg Places API returns an error.
     */
    onError?: (error: any) => void;
    /**
     * Callback triggered when the input is empty.
     */
    onClear?: () => void;
  }

  /**
   * Option for transition when the user click on a result on Leaflet.
   */
  interface LeafletTransitionOptions {
    /**
     * Type of camera move on result selection.
     * `jump`: change the position of the camera without animation
     * `fly`: animating camera transition along curve that evokes flight
     * `hybrid`: use `fly` when the camera is near the point and jump otherwise
     */
    type?: 'hybrid' | 'fly' | 'jump' | 'none';
  }

  /**
   * Option for transition when the user click on a result on MapLibre or Mapbox.
   */
  interface MapGLTransitionOptions extends LeafletTransitionOptions {
    /**
     * The zooming "curve" that will occur along the flight path.
     */
    flyCurve?: number;
    /**
     * The average speed of the animation defined in relation to `curve`.
     */
    flySpeed?: number;
  }

  /**
   * Option to show administrative area when available.
   */
  interface AdminAreaOptions {
    /**
     * `true` to show administrative boundary when the result is a administrative area.
     */
    show: boolean;
    /**
     * Fill color for the polygon.
     */
    fillColor?: string;
    /**
     * Outline color for the polygon.
     */
    outlineColor?: string;
  }

  /**
   * Option for MapLibre and Mapbox markers.
   */
  interface MapGLMarkerOptions {
    /**
     * `true` to show the result marker, `all` to show all results and `false` to hide markers.
     */
    show: boolean | 'all';
    /**
     * Name of the marker from your sprites.
     */
    icon?: string;
    /**
     * Anchor for the marker.
     */
    anchor?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /**
     * Use a custom marker with a URL. The response must be a PNG image.
     */
    iconUrl?: string;
  }

  /**
   * Option for Leaflet markers.
   */
  interface LeafletMarkerOptions {
    /**
     * `true` to show the result marker, `all` to show all results and `false` to hide markers.
     */
    show: boolean | 'all';
    /**
     * Marker to use for results.
     */
    icon?: L.Icon;
  }

  /**
   * Options for {@link JawgPlaces.Input}
   */
  interface JawgPlacesInputOptions extends JawgPlacesOptions {
    input: string | HTMLElement;
  }

  /**
   * Options for {@link JawgPlaces.MapLibre} and {@link JawgPlaces.Mapbox}
   */
  interface JawgPlacesMaplibreOptions extends JawgPlacesOptions {
    /**
     * The custom `<div>` that will contain the input and geocoding results when Places JS is used as MapLibre Control.
     * By default this is generated by Jawg Places JS.
     * With some frameworks/UI libs such as React, you can't use the ref here.
     */
    container?: string | HTMLElement;
    /**
     * Placeholder text to add when the input in generated by the library.
     */
    placeholder?: string;
    /**
     * Class to add to the input when it's generated by the library.
     */
    inputClasses?: string | string[];
    /** {@inheritDoc AdminAreaOptions} */
    adminArea?: AdminAreaOptions;
    /** {@inheritDoc MapGLMarkerOptions} */
    marker?: MapGLMarkerOptions | boolean | 'all';
    /** {@inheritDoc MapGLTransitionOptions} */
    transition?: MapGLTransitionOptions;
  }

  /**
   * Options for {@link JawgPlaces.Leaflet}
   */
  interface JawgPlacesLeafletOptions extends JawgPlacesOptions {
    /**
     * The custom `<div>` that will contain the input and geocoding results when Places JS is used as Leaflet Control.
     * By default this is generated by Jawg Places JS.
     * With some frameworks/UI libs such as React, you can't use the ref here.
     */
    container?: string | HTMLElement;
    /**
     * Placeholder text to add when the input in generated by the library.
     */
    placeholder?: string;
    /**
     * Class to add to the input when it's generated by the library.
     */
    inputClasses?: string | string[];
    /** {@inheritDoc AdminAreaOptions} */
    adminArea?: AdminAreaOptions;
    /** {@inheritDoc LeafletMarkerOptions} */
    marker?: LeafletMarkerOptions | boolean | 'all';
    /** {@inheritDoc LeafletTransitionOptions} */
    transition?: LeafletTransitionOptions;
    /**
     * Position of the input on the map.
     */
    position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
    /**
     * The Leaflet instance for marker creation
     */
    L: typeof L;
  }

  /**
   * This class will help you to transform any input into search bar for geocoding.
   */
  class Input extends AbstractPlaces {
    constructor(options: JawgPlacesInputOptions);
  }

  /**
   * This class will help you to add or use search bar for geocoding with a MapLibre GL JS map.
   */
  class MapLibre extends AbstractPlaces {
    constructor(options?: JawgPlacesMaplibreOptions);
    /**
     * This is the function used by MapLibre and Mapbox when you add a
     * [maplibre.IControl](https://maplibre.org/maplibre-gl-js-docs/api/markers/#icontrol) or [mapboxgl.IControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol).
     * Adds the control to the given map.
     * @param map The map from [MapLibre](https://maplibre.org/maplibre-gl-js-docs/api/map/) or [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/)
     * @returns The generated control container
     */
    onAdd(map: maplibregl.Map | mapboxgl.Map): HTMLElement;
    /**
     * When Jawg Places **is not used** as a control within your map, you will need to call this function.
     * @param map The map from [MapLibre](https://maplibre.org/maplibre-gl-js-docs/api/map/) or [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/)
     * @returns itself
     */
    attachMap(map: maplibregl.Map | mapboxgl.Map): MapLibre;
    /**
     * The default position of the control in the map.
     */
    getDefaultPosition(): 'top-left';
  }

  /**
   * This class will help you to add or use search bar for geocoding with a Mapbox GL JS map.
   */
  class Mapbox extends MapLibre {
    /**
     * @inheritdoc
     */
    attachMap(map: maplibregl.Map | mapboxgl.Map): Mapbox;
  }

  /**
   * This class will help you to add or use search bar for geocoding with a Leaflet map.
   */
  class Leaflet extends AbstractPlaces {
    constructor(options: JawgPlacesLeafletOptions);
    /**
     * This is the function used by Leaflet when you add a [L.Control](https://leafletjs.com/reference.html#control).
     * Adds the control to the given map.
     * @param map The map from [Leaflet](https://leafletjs.com/reference.html#map-example)
     */
    onAdd(map: L.Map): void;
    /**
     * The current position of the control in the map.
     */
    getPosition(): string;
    /**
     * Adds the control to the given map.
     * @param map from [Leaflet](https://leafletjs.com/reference.html#map-example)
     */
    addTo(map: L.Map): void;
    /**
     * When Jawg Places **is not used** as a control within your map, you will need to call this function.
     * @param map from [Leaflet](https://leafletjs.com/reference.html#map-example)
     * @returns itself
     */
    attachMap(map: L.Map): Leaflet;
  }

  /**
   * Current version of the library in Semantic Versioning.
   */
  const version: string;

  /**
   * Full representation of corret Jawg Maps attributions.
   */
  function attributions(): HTMLElement;
}

export as namespace JawgPlaces;
export default JawgPlaces;
