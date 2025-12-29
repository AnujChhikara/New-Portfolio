import { MapPin, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { LOCATION } from "~/lib/constants";

// Map configuration constants
const MAP_CONFIG = {
  geoUrl: "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
  width: 600,
  height: 300,
  scale: 150,
  minZoom: 1,
  maxZoom: 8,
  defaultZoom: 2,
} as const;

// Geography styles for map
const GEOGRAPHY_STYLES = {
  default: {
    fill: "#e5e7eb",
    stroke: "none",
    outline: "none",
    cursor: "grab",
  },
  hover: {
    fill: "#d1d5db",
    stroke: "none",
    outline: "none",
    cursor: "grab",
  },
  pressed: {
    fill: "#d1d5db",
    stroke: "none",
    outline: "none",
    cursor: "grabbing",
  },
} as const;

// Zoom button styles
const ZOOM_BUTTON_CLASSES =
  "p-1.5 sm:p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors touch-manipulation";

interface MapPosition {
  coordinates: [number, number];
  zoom: number;
}

/**
 * Interactive location map component
 * Displays user location with zoom controls
 */
export function LocationMap() {
  const [position, setPosition] = useState<MapPosition>({
    coordinates: LOCATION.coordinates,
    zoom: MAP_CONFIG.defaultZoom,
  });

  // Memoized handlers for performance
  const handleMoveEnd = useCallback((newPosition: MapPosition) => {
    setPosition(newPosition);
  }, []);

  const handleZoomIn = useCallback(() => {
    setPosition((prev) => ({
      ...prev,
      zoom: Math.min(prev.zoom + 0.5, MAP_CONFIG.maxZoom),
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setPosition((prev) => ({
      ...prev,
      zoom: Math.max(prev.zoom - 0.5, MAP_CONFIG.minZoom),
    }));
  }, []);

  const handleReset = useCallback(() => {
    setPosition({
      coordinates: LOCATION.coordinates,
      zoom: MAP_CONFIG.defaultZoom,
    });
  }, []);

  return (
    <div
      className="relative w-full h-full rounded-lg overflow-hidden bg-blue-50 dark:bg-neutral-900"
      role="img"
      aria-label={`Map showing location: ${LOCATION.name}`}
    >
      <ComposableMap
        projectionConfig={{
          scale: MAP_CONFIG.scale,
          center: LOCATION.coordinates,
        }}
        width={MAP_CONFIG.width}
        height={MAP_CONFIG.height}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          minZoom={MAP_CONFIG.minZoom}
          maxZoom={MAP_CONFIG.maxZoom}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={MAP_CONFIG.geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={GEOGRAPHY_STYLES.default.fill}
                  stroke="none"
                  style={GEOGRAPHY_STYLES}
                />
              ))
            }
          </Geographies>
          <Marker coordinates={LOCATION.coordinates}>
            <g aria-label="Location marker">
              <circle r={3} fill="#3b82f6" stroke="#fff" strokeWidth={1.5} />
              <circle r={6} fill="#3b82f6" opacity={0.3} />
              <circle r={9} fill="#3b82f6" opacity={0.1} />
            </g>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom Controls */}
      <div
        className="absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col gap-1.5 sm:gap-2 z-10"
        role="group"
        aria-label="Map zoom controls"
      >
        <button
          onClick={handleZoomIn}
          className={ZOOM_BUTTON_CLASSES}
          aria-label="Zoom in"
          type="button"
        >
          <ZoomIn
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-700 dark:text-neutral-300"
            aria-hidden="true"
          />
        </button>
        <button
          onClick={handleZoomOut}
          className={ZOOM_BUTTON_CLASSES}
          aria-label="Zoom out"
          type="button"
        >
          <ZoomOut
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-700 dark:text-neutral-300"
            aria-hidden="true"
          />
        </button>
        <button
          onClick={handleReset}
          className={`${ZOOM_BUTTON_CLASSES} text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300`}
          aria-label={`Reset map to ${LOCATION.name}`}
          type="button"
        >
          Reset
        </button>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Location label */}
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 pointer-events-none">
        <MapPin
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0"
          aria-hidden="true"
        />
        <span className="text-xs sm:text-sm text-white font-medium">
          {LOCATION.name}
        </span>
      </div>
    </div>
  );
}
