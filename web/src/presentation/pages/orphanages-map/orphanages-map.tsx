import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'

import mapMarkerImg from '@/presentation/assets/images/map-marker.svg'

import 'leaflet/dist/leaflet.css'
import './orphanages-map.css'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

function OrphanagesMap () {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy Map Marker" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Altamira</strong>
          <span>Pará</span>
        </footer>
      </aside>

      <Map
        center={[-3.2081546, -52.2262043]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker
          icon={mapIcon}
          position={[-3.2081546, -52.2262043]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Unidade de Acolhimento
            <Link to="">
              <FiArrowRight size={20} color="#FFF"/>
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap
