import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';

import { small, medium, large } from './styled-components';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2hhZHRtaWxsZXIiLCJhIjoiY2s2YXpoY3V2MHc0YTNsbGp2c3h0NGY0OSJ9.9cpgobp96NPvaEngpEZVAA';

const MapCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MapWrapper = styled.div`
  border: 2px solid #333;
  border-radius: 5px;

  &:not(last-child) {
    margin-right: 10px;
  }
`;

const MapContainer = styled.div`
  ${small`
      width: 300px;
      height: 200px
  `}
  ${medium`
      width: 425px;
      height: 300px
  `}
  ${large`
      width: 425px;
      height: 300px
  `}
`;

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
    <MapCard>
      <h3>{title}</h3>
      <MapWrapper>
        <MapContainer ref={el => (mapContainerEl = el)} />
      </MapWrapper>
    </MapCard>
  );
};
