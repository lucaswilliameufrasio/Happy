import React, { useContext } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'

import Context from '@/presentation/contexts/form/form-context'
import leafletMapIcon from '@/presentation/helpers/leaflet-map-icon-config'

import './form-map.css'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function FormMap (props: Props) {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  function handleMapClick (event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setState({ ...state, [props.name]: { ...state[props.name], latitude: lat, longitude: lng } })
  }

  return (
    <div className="map-block">
      <Map
        center={[-3.2081546, -52.2261614]}
        style={{ width: '100%', height: 280 }}
        zoom={15}
        onclick={handleMapClick}
        className={error ? 'leaflet-container-highlighted-error' : ''}
      >
        <TileLayer
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {state[props.name].latitude && (
          <Marker
            interactive={false}
            icon={leafletMapIcon}
            position={[state[props.name].latitude, state[props.name].longitude]}
          />
        )}

      </Map>
      {error && <span data-testid={`${props.name}-error`} className="form-map-span-error">{error}</span>}
    </div>
  )
}

export default FormMap
