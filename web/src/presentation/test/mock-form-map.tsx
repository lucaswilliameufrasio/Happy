import React from 'react'
import Context from '@/presentation/contexts/form/form-context'
import { Map, TileLayer } from 'react-leaflet'

export const MockFormMap = (lat: number, lng: number) => {
  function mockedFormMap (props: any) {
    const { state, setState } = React.useContext(Context)

    function handleMapClick () {
      setState({ ...state, [props.name]: { ...state[props.name], latitude: lat, longitude: lng } })
    }

    return (
      <div data-testid={props.name}>
        <Map
          center={[lat, lng]}
          zoom={15}
          onclick={handleMapClick}
        >
          <TileLayer
            url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    )
  }

  return mockedFormMap
}
