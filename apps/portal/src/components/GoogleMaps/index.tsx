import { memo, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { FaLocationArrow } from 'react-icons/fa'
// import { Input } from '@chakra-ui/react'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader
  // StandaloneSearchBox,
  // useLoadScript
} from '@react-google-maps/api'

import { environment } from '../../environments/environment'
import { libraries } from '../../helpers'
import { Loader } from '../Loader'

const containerStyle = {
  width: '100%',
  minHeight: '800px',
  height: 'auto'
}

export interface GoogleMapProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  center: {
    lat: number
    lng: number
  }
  lng: number
  lat: number
  label: string
  onDragEnd: () => unknown
}

export interface IMapData {
  result: Record<string, unknown>
  coords: {
    lat: number
    lng: number
  }
}
export interface ICoords {
  lat: number
  lng: number
}

const formatCoords = n => {
  if (n) {
    const l = n.toString().length - 3
    const v = n / Math.pow(10, l)

    return v
  }
}

export const GoogleMapComponent = ({
  lng,
  lat,
  label,
  onDragEnd,
  center = { lat: -34.397, lng: 150.644 }
}: GoogleMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NX_MAPS_API_KEY
      ? process.env.NX_MAPS_API_KEY
      : environment.MAPS_API_KEY,
    channel: 'beta',
    version: '3',
    mapIds: ['89273f1950655e83'],
    libraries
  })

  const [location, setLocation] = useState({ lat: lat, lng: lng })
  const [options] = useState({
    mapId: '89273f1950655e83'
  })

  const [isOpen, setIsOpen] = useState(true)
  const markerRef = useRef(null)
  const mapRef = useRef(null)
  const [, setMap] = useState(null)
  // const [coords, setCoords] = useState<ICoords>()
  // const [mapData, setMapData] = useState({
  //   result: {
  //     modelBuf: {
  //       centroids: {
  //         geometry: {
  //           coords: {}
  //         }
  //       }
  //     }
  //   }
  // })

  const handleOnMarkerLoad = useCallback(
    marker => {
      markerRef.current = marker
    },
    [markerRef]
  )

  useEffect(() => {
    setLocation({ lat: lat, lng: lng })
  }, [lng, lat])

  const handleToggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const onLoad = useCallback(
    function callback(map) {
      // const bounds = new window.google.maps.LatLngBounds()
      // map.fitBounds(bounds)
      setMap(map)
    },
    [setMap]
  )

  const onUnmount = useCallback(
    function callback(/*map*/) {
      setMap(null)
    },
    [setMap]
  )

  const onClick = (...args) => {
    console.log('onClick args: ', args)
  }

  if (loadError) {
    return <div>{loadError}</div>
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <Suspense fallback={<Loader size="xl" />}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={onClick}
          options={options}
        >
          <Marker
            position={center}
            onClick={handleToggleOpen}
            draggable
            onLoad={handleOnMarkerLoad}
            onDragEnd={onDragEnd}
          >
            {isOpen && (
              <InfoWindow onCloseClick={handleToggleOpen} position={center}>
                <div>
                  <FaLocationArrow /> {label}
                </div>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      )}
    </Suspense>
  )
}

export default memo(GoogleMapComponent)
