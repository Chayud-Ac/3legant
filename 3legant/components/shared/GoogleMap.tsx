"use client";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      // Use importLibrary to load the necessary libraries
      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");
      const position = {
        lat: 13.7563, // Latitude for Bangkok, Thailand
        lng: 100.5018, // Longitude for Bangkok, Thailand
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 8,
      };

      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, mapOptions);

        const marker = new google.maps.Marker({
          position,
          map,
          title: "3legant Company location", // Optional: Add a title for the marker
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // URL for the red marker
          },
        });

        // Add a click event listener to the marker
        marker.addListener("click", () => {
          window.open(
            `https://www.google.com/maps?q=${position.lat},${position.lng}`,
            "_blank"
          );
        });
      }
    };

    initMap();
  }, []);

  return (
    <div ref={mapRef} className="w-full h-[500px]">
      GoogleMap
    </div>
  );
};

export default GoogleMap;
