import { useState } from 'react'
import ReactMapGL from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

import StyledMapboxGL, { StyledMapboxGLContainer } from './style'

/* eslint-disable-next-line */
export interface MapboxGLProps {
  mapboxToken: string
}

export const MapboxGL = ({ mapboxToken }: MapboxGLProps) => {
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -96,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  })

  return (
    <StyledMapboxGL>
      <StyledMapboxGLContainer>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/thepublichealthco/ckx831qwq1m9s14mtum8t9k7l"
          onViewportChange={setViewport}
          mapboxApiAccessToken={mapboxToken}
        />
      </StyledMapboxGLContainer>
    </StyledMapboxGL>
  )
}

export default MapboxGL
