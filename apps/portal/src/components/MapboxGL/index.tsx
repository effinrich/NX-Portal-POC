import React, { useEffect, useRef, useState } from 'react'
import ReactMapGL, { Layer, Source } from 'react-map-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'

import 'mapbox-gl/dist/mapbox-gl.css'

import { environment } from '../../environments/environment'
/* eslint-disable-next-line */
export interface MapboxGLProps {}

const StyledMapboxGL = styled.div`
  width: 100%;
`

const StyledMapboxGLContainer = styled.div`
  height: 50vh;
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
  display: none;
`

const mapboxToken = process.env.NX_MAPBOX_TOKEN
  ? process.env.NX_MAPBOX_TOKEN
  : environment.MAPBOX_TOKEN

mapboxgl.accessToken = mapboxToken

// const layers = [
//   '0-10',
//   '10-20',
//   '20-50',
//   '50-100',
//   '100-200',
//   '200-500',
//   '500-1000',
//   '1000+'
// ]
// const colors = [
//   '#FFEDA0',
//   '#FED976',
//   '#FEB24C',
//   '#FD8D3C',
//   '#FC4E2A',
//   '#E31A1C',
//   '#BD0026',
//   '#800026'
// ]

export function MapboxGL(props: MapboxGLProps) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-96)
  const [lat, setLat] = useState(40)
  const [zoom, setZoom] = useState(3.5)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/thepublichealthco/ckx831qwq1m9s14mtum8t9k7l',
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
