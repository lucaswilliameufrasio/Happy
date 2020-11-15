import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useHistory } from 'react-router-dom'

import leafletMapIcon from '@/presentation/helpers/leaflet-map-icon-config'
import { Sidebar } from '@/presentation/components'
import { LoadOrphanageById } from '@/domain/usecases/load-orphanage-by-id'

import './orphanage.css'

type Props = {
  loadOrphanageById: LoadOrphanageById
}

export default function Orphanage ({ loadOrphanageById }: Props) {
  const history = useHistory()
  const [orphanage, updateOrphanageData] = useState<LoadOrphanageById.Model>({
    id: null,
    name: null,
    about: null,
    approved: null,
    images: [{ name: null, url: null }],
    instructions: null,
    latitude: -3.2081546,
    longitude: -52.2262043,
    open_on_weekend: null,
    opening_hours: null,
    whatsapp: null
  })
  const [imageActiveIndex, setImageActiveIndex] = useState(0)

  useEffect(() => {
    loadOrphanageById.loadById()
      .then(orphanageData => updateOrphanageData(orphanageData))
      .catch(error => {
        console.log(error)
        history.push('/app')
      })
  }, [])

  function handleWhatsappContact () {
    window.location.href = `https://api.whatsapp.com/send?phone=${orphanage.whatsapp}&text=Olá,%20${orphanage.name}%20gostaria%20de%20agendar%20um%20dia%20para%20visitar%20o%20orfanato.`
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[imageActiveIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => (
              <button
                key={image.name}
                className={imageActiveIndex === index ? 'active' : ''}
                type="button"
                onClick={() => setImageActiveIndex(index)}
              >
                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker interactive={false} icon={leafletMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a rel="noopener noreferrer" href={`http://maps.google.com/?q=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekend ? (
                <div className="open-on-weekend">
                  <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
                </div>
              ) : (
                <div className="open-on-weekend do-not-open">
                  <FiInfo size={32} color="#FF6690" />
                Não tendemos <br />
                fim de semana
                </div>
              )}
            </div>

            <a rel="noopener noreferrer" target="_blank" type="button" className="contact-button" onClick={handleWhatsappContact}>
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
