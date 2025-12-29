import { MapPin, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

export function LocationMap() {
  const coordinates: [number, number] = [77.2065, 28.5245]; // Saket, New Delhi
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({
    coordinates: coordinates,
    zoom: 2,
  });

  function handleMoveEnd(newPosition: {
    coordinates: [number, number];
    zoom: number;
  }) {
    setPosition(newPosition);
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-blue-50 dark:bg-neutral-900">
      <ComposableMap
        projectionConfig={{
          scale: 150,
          center: coordinates,
        }}
        width={600}
        height={300}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          minZoom={1}
          maxZoom={8}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#e5e7eb"
                  stroke="none"
                  style={{
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
                  }}
                />
              ))
            }
          </Geographies>
          <Marker coordinates={coordinates}>
            <g>
              <circle r={3} fill="#3b82f6" stroke="#fff" strokeWidth={1.5} />
              <circle r={6} fill="#3b82f6" opacity={0.3} />
              <circle r={9} fill="#3b82f6" opacity={0.1} />
            </g>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={() =>
            setPosition({ ...position, zoom: Math.min(position.zoom + 0.5, 8) })
          }
          className="p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
        </button>
        <button
          onClick={() =>
            setPosition({ ...position, zoom: Math.max(position.zoom - 0.5, 1) })
          }
          className="p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
        </button>
        <button
          onClick={() => setPosition({ coordinates: coordinates, zoom: 2 })}
          className="p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-xs font-medium text-neutral-700 dark:text-neutral-300"
          aria-label="Reset to New Delhi"
        >
          Reset
        </button>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-none">
        <MapPin className="w-4 h-4 text-white" />
        <span className="text-white font-medium">New Delhi, India</span>
      </div>
    </div>
  );
}
