/// <reference types="geojson" />
/// <reference types="mapbox-gl" />
/// <reference types="maplibre-gl" />

import L = require('leaflet');

declare class AbstractPlaces {
  constructor(options: JawgPlaces.JawgPlacesOptions);
  /**
   * Search a random text, lat/lon or GID using Jawg Places.
   *
   * All features are points with properties, more details on our [documentation](https://www.jawg.io/docs/apidocs/places/response).
   *
   * See {@link JawgPlacesOptions.reverse} for lat/lon search and {@link JawgPlacesOptions.place} for GID search.
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
   * This will trigger {@link JawgPlacesOptions.onFeatures} callback.
   * Use it if you want to display specific results or add new elements.
   * @param results Feature Collection of geocoded points.
   */
  showResults(results: JawgPlaces.FeatureCollection): void;
  /**
   * Close the result list.
   */
  close(): void;
  /**
   * Destroy all created DOM elements and listeners.
   * This could be useful when you recreate a JawgPlace instance for the same input.
   */
  destroy(): void;
}

/**
 * Welcome to Jawg Places JS type documentation. You will find the complete API of our library to help you with your developments.
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
   * Option to activate Reverse Geocoding detection within the input.
   * You can paste coordinates in the form {lat}/{lon} in the input.
   * The separation can be either `/` (slash), `,` (comma) or ` ` (space).
   *
   * ```javascript
   * const reverse = {
   *   enabled: true,
   *   radius: 5,
   * }
   * ```
   */
  interface ReverseOptions {
    /**
     * Enable reverse geocoding enpoint.
     */
    enabled: boolean;
    /**
     * Radius over the point in meters. The maximum value is 5.
     */
    radius?: number;
  }

  /**
   * Option to set a circle to constrain forward geocoding results to a specific circular geographic area.
   *
   * ```javascript
   * const circle = { lat: 46.842269, lon: 2.39985, radius: 500 }
   * ```
   */
  interface CircleOptions extends LatLon {
    /**
     * Radius over the point in kilometers.
     */
    radius?: number;
  }

  /**
   * Option to set a rectangle to constrain forward geocoding results to a specific rectangular geographic area.
   *
   * ```javascript
   * const rectangle = {
   *   min: { lat: 43.032582, lon: 5.097656 },
   *   max: { lat: 49.006466, lon: 26.762695 },
   * }
   * ```
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
   * Set of options to restrict your forward geocoding to specific regions.
   * It will filter out all locations outside the configured boundaries.
   *
   * ```javascript
   * const boundary = {
   *   countries: 'fra',
   *   circle: { lat: 46.842269, lon: 2.39985, radius: 500 },
   *   rectangle: {
   *     min: { lat: 43.032582, lon: 5.097656 },
   *     max: { lat: 49.006466, lon: 26.762695 },
   *   },
   *   gids: ['openstreetmap:island:relation/966358']
   * }
   * ```
   */
  interface BoudaryOptions {
    /**
     * Option to set alpha-2 or alpha-3 [ISO-3166](https://en.wikipedia.org/wiki/ISO_3166) country codes to constrain forward geocoding results to specific countries.
     *
     * @remarks Countries can be static or dynamic through a function.
     */
    countries?: string[] | string | (() => string[]) | (() => string);
    /**
     * @inheritDoc CircleOptions
     *
     * @remarks The circle can be static or dynamic through a function.
     */
    circle?: CircleOptions | (() => CircleOptions);
    /**
     * Option to set GIDs to constrain forward geocoding results to specific regions (States, Cities...) using our identifiers.
     *
     * @remarks GIDs can be static or dynamic with the function.
     */
    gids?: string[] | string | (() => string[]) | (() => string);
    /**
     * @inheritDoc RectangleOptions
     *
     * @remarks The rectangle can be static or dynamic through a function.
     */
    rectangle?: RectangleOptions | (() => RectangleOptions);
  }

  /**
   * Set of options to prioritize your forward geocoding to specific regions.
   * All locations in these regions will have a better ranking.
   *
   * ```javascript
   * const focus = {
   *   countries: 'fra',
   *   point: { lat: 46.842269, lon: 2.39985 },
   *   gids: ['openstreetmap:island:relation/966358']
   * }
   * ```
   */
  interface FocusOptions {
    /**
     * Option to set alpha-2 or alpha-3 [ISO-3166](https://en.wikipedia.org/wiki/ISO_3166) country codes to prioritize forward geocoding results to specific countries. All locations in these countries will have a better ranking.
     *
     * @remarks Countries can be static or dynamic through a function.
     */
    countries?: string[] | string | (() => string[]) | (() => string);
    /**
     * Sort results in part by their proximity to the given coordinate.
     *
     * @remarks Coordinates can be static or dynamic through a function. The radius is 50km and cannot be changed.
     */
    point?: LatLon | (() => LatLon);
    /**
     * Option to set GIDs to prioritize forward geocoding results to specific regions (States, Cities...) using our identifiers. All locations connected to these GIDs will have a better ranking.
     *
     * @remarks GIDs can be static or dynamic through a function.
     */
    gids?: string[] | string | (() => string[]) | (() => string);
  }

  type GeometriesOptions = 'point' | 'source';

  /**
   * Option to activate Place Details detection within the input.
   * You can paste one or many GIDs in the input.
   * The separation can be either `,` (comma) or ` ` (space).
   *
   * ```javascript
   * const place = {
   *   enabled: true,
   *   geometries: 'source'
   * }
   * ```
   */
  interface PlaceOptions {
    /**
     * Enable place details endpoint.
     */
    enabled: boolean;
    /**
     * Set the type of return from Places Details API, either a point or the source geometry.
     *
     * @remarks geometries can be static or dynamic through a function.
     */
    geometries?: GeometriesOptions | (() => GeometriesOptions);
  }

  /**
   * Type of geometries used by Jawg Places API.
   *
   * ```json
   * {
   *   "type": "Feature",
   *   "geometry": {
   *     "type": "Point",
   *     "coordinates": [ 2.320041, 48.85889 ]
   *   },
   *   "properties": {
   *     "id": "relation/7444",
   *     "gid": "openstreetmap:localadmin:relation/7444",
   *     "layer": "localadmin",
   *     "source": "openstreetmap",
   *     "source_id": "relation/7444",
   *     "country_code": "FR",
   *     "name": "Paris",
   *     "label": "Paris, France",
   *     "addendum": { }
   *   },
   *   "bbox": [ 2.224121956250343, 48.81557548222165, 2.469760166634671, 48.90215593195729 ]
   * }
   * ```
   */
  type Feature = GeoJSON.Feature<GeoJSON.Point | GeoJSON.Polygon | GeoJSON.MultiPolygon>;

  /**
   * Return type of Jawg Places API.
   *
   * ```json
   * {
   *  "geocoding": {
   *    "version": "0.2",
   *    "attribution": "...",
   *    "query": { },
   *    "engine": {
   *      "name": "Jawg Places",
   *      "author": "Jawg",
   *      "version": "1.0"
   *    }
   *  },
   *  "type": "FeatureCollection",
   *  "features": [ ],
   *  "bbox": [ ]
   * ```
   */
  type FeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Point | GeoJSON.Polygon | GeoJSON.MultiPolygon>;

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

  /** @ignore */
  interface JawgPlacesOptions {
    /**
     * Your personal access token, create your own on the [Jawg Lab](https://www.jawg.io/lab).
     * This is filled automatically when you get the library with our CDN or [@jawg/js-loader](https://www.npmjs.com/package/@jawg/js-loader).
     */
    accessToken?: string;
    /**
     * The `<input>` to transform into a geocoding search bar.
     * This can be either an id (e.g. `#my-input`), class selector (e.g. `.my-input`) or the [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
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
     *
     * @remarks Language can be static or dynamic through a function.
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
     * This option works only when `searchOnTyping=true`.
     *
     * @defaultValue 0
     */
    minLength?: number;
    /**
     * Set the number of milliseconds to wait before sending search requests.
     * If you press `Enter` the search will be immediately validated.
     * This option works only when `searchOnTyping=true`.
     *
     * @remarks with a basic plan you may set this option to 1000 to avoid your restrictions.
     *
     * @defaultValue 350
     */
    debounceDelay?: number;
    /**
     * Restrict your search (forward and reverse) to specific layers. You can get only addresses or administrative areas for example.
     *
     * @remarks Layers can be static or dynamic through a function.
     */
    layers?: Layer[] | Layer | (() => Layer) | (() => Layer[]);
    /**
     * Restrict your search (forward and reverse) to specific data sources. You can get only OSM or WOF data for example. This is not recommended.
     *
     * @remarks Sources can be static or dynamic through a function.
     */
    sources?: Source[] | Source | (() => Source[]) | (() => Source);
    /**
     * @inheritDoc FocusOptions.point
     * @deprecated Replaced by {@link FocusOptions.point}
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
     * Show icon on the left side of each results.
     */
    showResultIcons?: boolean;
    /**
     * Add a clear cross on the right side of the input.
     */
    clearCross?: boolean;
    /**
     * Set the maximum number of results for forward and reverse geocoding.
     *
     * @defaultValue 10
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
     * @param features The list of features returned by Jawg Places API. Can be an empty array.
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
     * Callback triggered when the input is cleared.
     */
    onClear?: () => void;
  }

  /**
   * Set of option to configure the transition when the user click on a result on Leaflet.
   *
   * ```javascript
   * const transition = {
   *   type: 'hybrid',
   * }
   * ```
   */
  interface LeafletTransitionOptions {
    /**
     * Type of camera move on result selection.
     * - `jump`: change the position of the camera without animation
     * - `fly`: animating camera transition along curve that evokes flight
     * - `hybrid`: use `fly` when the camera is near the point and jump otherwise
     */
    type?: 'hybrid' | 'fly' | 'jump' | 'none';
  }

  /**
   * Set of options to configure the transition when the user click on a result on MapLibre or Mapbox.
   *
   * ```javascript
   * const transition = {
   *   type: 'hybrid',
   *   flyCurve: 1.42,
   *   flySpeed: 1.2,
   * }
   * ```
   */
  interface MapGLTransitionOptions extends LeafletTransitionOptions {
    /**
     * The zooming "curve" that will occur along the flight path.
     *
     * @defaultValue 1.42
     */
    flyCurve?: number;
    /**
     * The average speed of the animation defined in relation to `curve`.
     *
     * @defaultValue 1.2
     */
    flySpeed?: number;
  }

  /**
   * Set of options to display the selected administrative area on the map when it's available.
   *
   * ```javascript
   * const adminArea = {
   *   show: true,
   *   fillColor: 'rgba(0, 75, 120, 0.1)',
   *   outlineColor: 'rgba(0, 75, 120, 1)',
   * }
   * ```
   */
  interface AdminAreaOptions {
    /**
     * `true` to show administrative boundary when the result is an administrative area.
     */
    show: boolean;
    /**
     * Fill color of the polygon, you should play with the opacity.
     *
     * @defaultValue 'rgba(0, 75, 120, 0.1)'
     */
    fillColor?: string;
    /**
     * Outline color of the polygon.
     *
     * @defaultValue 'rgba(0, 75, 120, 1)'
     */
    outlineColor?: string;
  }

  /**
   * Option to activate Place Details detection within the input.
   * You can paste one or many GIDs in the input.
   * The separation can be either `,` (comma) or ` ` (space).
   *
   * ```javascript
   * const place = {
   *   enabled: true,
   *   geometries: 'source',
   *   fillColor: 'rgba(105, 87, 117, 0.1)',
   *   outlineColor: 'rgba(105, 87, 117, 1)',
   * }
   * ```
   */
  interface MapPlaceOptions extends PlaceOptions {
    /**
     * Fill color of the polygon, you should play with the opacity.
     *
     * @defaultValue 'rgba(105, 87, 117, 0.1)'
     */
    fillColor?: string;
    /**
     * Outline color of the polygon.
     *
     * @defaultValue 'rgba(105, 87, 117, 1)'
     */
    outlineColor?: string;
  }

  /**
   * Option for MapLibre and Mapbox markers.
   *
   * ```javascript
   * const marker = {
   *   show: 'all',
   *   icon: 'marker',
   * }
   * ```
   */
  interface MapGLMarkerOptions {
    /**
     * `true` to show the result marker, `all` to show all results and `false` to hide markers.
     */
    show: boolean | 'all';
    /**
     * Name of the marker from your sprites.
     *
     * @defaultValue 'marker'
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
   *
   * ```javascript
   * const marker = {
   *   show: 'all',
   * }
   * ```
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
   * Options to configure a Places JS instance for a HTML `<input>` element.
   *
   * ```javascript
   * const options = {
   *   accessToken: '<Access-Token>',
   *   input: '#my-input',
   * }
   * ```
   *
   * @remarks Options for {@link JawgPlaces.Input}
   */
  interface JawgPlacesInputOptions extends JawgPlacesOptions {
    input: string | HTMLElement;
  }

  /**
   * Options to configure a Places JS instance for a MapLibre or Mapbox map.
   *
   * ```javascript
   * const options = {
   *   accessToken: '<Access-Token>',
   *   input: '#my-input',
   * }
   * ```
   *
   * @remarks Options for {@link JawgPlaces.MapLibre} and {@link JawgPlaces.Mapbox}
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
    /** {@inheritDoc MapPlaceOptions} */
    place?: MapPlaceOptions;
  }

  /**
   * Options to configure a Places JS instance for a Leaflet map.
   *
   * ```javascript
   * const options = {
   *   accessToken: '<Access-Token>',
   *   input: '#my-input',
   * }
   * ```
   *
   * @remarks Options for {@link JawgPlaces.Leaflet}
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
    /** {@inheritDoc MapPlaceOptions} */
    place?: MapPlaceOptions;
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
   * This class will help you transform any input into a search bar for geocoding.
   *
   * ```javascript
   * const jawgPlaces = new JawgPlaces.Input({
   *   accessToken: 'Access-Token',
   *   input: '#my-input',
   * })
   * ```
   */
  class Input extends AbstractPlaces {
    /** {@inheritDoc Input} */
    constructor(options: JawgPlacesInputOptions);
  }

  /**
   * This class will help you add or use search bar for geocoding with a MapLibre GL JS map.
   *
   * ```javascript
   * const jawgPlaces = new JawgPlaces.MapLibre({
   *   accessToken: 'Access-Token',
   * })
   * map.addControl(jawgPlaces)
   * ```
   */
  class MapLibre extends AbstractPlaces {
    /** {@inheritDoc MapLibre} */
    constructor(options?: JawgPlacesMaplibreOptions);
    /**
     * When Jawg Places **is not used** as a control within your map, you will need to call this function.
     * @param map The map from [MapLibre](https://maplibre.org/maplibre-gl-js-docs/api/map/) or [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/)
     * @returns itself
     */
    attachMap(map: maplibregl.Map | mapboxgl.Map): this;
    /**
     * The default position of the control in the map.
     */
    getDefaultPosition(): 'top-left';
  }

  /**
   * This class will help you add or use search bar for geocoding with a Mapbox GL JS map.
   *
   * ```javascript
   * const jawgPlaces = new JawgPlaces.Mapbox({
   *   accessToken: 'Access-Token',
   * })
   * map.addControl(jawgPlaces)
   * ```
   */
  class Mapbox extends MapLibre {
    /** {@inheritDoc Mapbox} */
    constructor(options?: JawgPlacesMaplibreOptions);
  }

  /**
   * This class will help you add or use search bar for geocoding with a Leaflet map.
   *
   * ```javascript
   * const jawgPlaces = new JawgPlaces.Leaflet({
   *   accessToken: 'Access-Token',
   *   L: L,
   * }).addTo(map)
   * // map.addControl(jawgPlaces)
   * ```
   */
  class Leaflet extends AbstractPlaces {
    /** {@inheritDoc Leaflet} */
    constructor(options: JawgPlacesLeafletOptions);
    /**
     * The current position of the control in the map.
     */
    getPosition(): string;
    /**
     * Adds the control to the given map. You can alternatively use `map.addControl(jawgPlaces)`.
     * @param map from [Leaflet](https://leafletjs.com/reference.html#map-example)
     */
    addTo(map: L.Map): this;
    /**
     * When Jawg Places **is not used** as a control within your map, you will need to call this function.
     * @param map from [Leaflet](https://leafletjs.com/reference.html#map-example)
     * @returns itself
     */
    attachMap(map: L.Map): this;
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
