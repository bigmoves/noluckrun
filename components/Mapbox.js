import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import { Box, Stack, Heading, IconButton } from '@chakra-ui/core';

import { MdFullscreen } from 'react-icons/md';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2hhZHRtaWxsZXIiLCJhIjoiY2s2YXpoY3V2MHc0YTNsbGp2c3h0NGY0OSJ9.9cpgobp96NPvaEngpEZVAA';

export const Mapbox = ({ title, dataUrl }) => {
  const [map, setMap] = useState(null);
  let mapContainerEl = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainerEl }) => {
      const map = new mapboxgl.Map({
        container: mapContainerEl,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-122.578884, 45.540868],
        zoom: 13
      });

      map.on('load', () => {
        map.addSource('route', { type: 'geojson', data: dataUrl });
        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#888',
            'line-width': 8
          }
        });

        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainerEl });
  }, [map]);

  return (
    <Stack>
      <Heading size="md" my={3}>
        {title}
      </Heading>
      <Box
        position="relative"
        width={[390, 475, 600, 936]}
        height={[250, 400, 400, 400]}
        border="2px solid #333"
        borderRadius={1}
        ref={el => (mapContainerEl = el)}
      >
        <IconButton
          variantColor="purple"
          position="absolute"
          top={3}
          right={3}
          icon={MdFullscreen}
          zIndex={100}
          onClick={() => map.getContainer().requestFullscreen()}
        />
      </Box>
    </Stack>
  );
};
