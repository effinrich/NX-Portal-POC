import React, { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'

import 'mapbox-gl/dist/mapbox-gl.css'
/* eslint-disable-next-line */
export interface MapboxGLProps {}

const StyledMapboxGL = styled.div`
  width: 100%;
`

const StyledMapboxGLContainer = styled.div`
  height: 400px;
`

const StyledMapboxGLSideBar = styled.div`
  background-color: rgba(35, 55, 75, 0.9);
  color: #fff;
  padding: 6px 12px;
  font-family: monospace;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
  border-radius: 4px;
`

mapboxgl.accessToken =
  'pk.eyJ1IjoidGhlcHVibGljaGVhbHRoY28iLCJhIjoiY2t3eTVrZWlsMGh6ZjJvbnNsbG8xMHdzeSJ9.WiorL-p1uAsoRN7QpBLUJA'

export function MapboxGL(props: MapboxGLProps) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <StyledMapboxGL>
      <StyledMapboxGLSideBar>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </StyledMapboxGLSideBar>
      <StyledMapboxGLContainer ref={mapContainer} />
    </StyledMapboxGL>
  )
}

export default MapboxGL
