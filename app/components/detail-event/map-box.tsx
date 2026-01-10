import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type { Location } from "~/modules/event/type";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

type EventMapProps = {
  location: Location;
};

export default function EventMap({ location }: EventMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !mapContainerRef.current ||
      location.latitude == null ||
      location.longitude == null
    ) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [location.longitude, location.latitude],
      zoom: 14,
      interactive: true,
    });

    new mapboxgl.Marker()
      .setLngLat([location.longitude, location.latitude])
      .addTo(map);

    return () => map.remove();
  }, [location.latitude, location.longitude]);

  return <div ref={mapContainerRef} className="w-full h-full rounded-md" />;
}
