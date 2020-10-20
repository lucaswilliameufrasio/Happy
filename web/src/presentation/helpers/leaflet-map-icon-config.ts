import Leaflet from 'leaflet'

import mapMarkerImg from '@/presentation/assets/images/map-marker.svg'

const leafletMapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default leafletMapIcon
