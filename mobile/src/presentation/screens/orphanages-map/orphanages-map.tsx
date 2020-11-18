import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import styles from './orphanages-map-styles'

import mapMarker from '../../../../assets/map-marker.png'

function OrphanagesMap () {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -3.2081546,
          longitude: -52.2262043,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009
        }}
      >
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
          coordinate={{
            latitude: -3.2081546,
            longitude: -52.2262043
          }}
        >
          <Callout tooltip onPress={() => {}}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Alou</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>1 orfanato encontrado</Text>
        <TouchableOpacity style={styles.createOrphanageButton} onPress={() => {}}>
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OrphanagesMap
