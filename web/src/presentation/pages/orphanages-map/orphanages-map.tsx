import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'

import { LoadOrphanages } from '@/domain/usecases/load-orphanages'

import leafletMapIcon from '@/presentation/helpers/leaflet-map-icon-config'
import mapMarkerImg from '@/presentation/assets/images/map-marker.svg'

import './orphanages-map.css'

type Props = {
  loadOrphanages: LoadOrphanages
}

function OrphanagesMap ({ loadOrphanages }: Props) {
  const [orphanagesList, updateOrphanageList] = useState<LoadOrphanages.Model[]>([])

  useEffect(() => {
    loadOrphanages.load().then(orphanages => updateOrphanageList(orphanages)).catch(error => console.log(error))
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy Map Marker" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita {':)'}</p>
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

        {orphanagesList.length > 0 && orphanagesList.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={leafletMapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF"/>
              </Link>
            </Popup>
          </Marker>
        ))}

      </Map>

      <Link to="/orphanages/add" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap
