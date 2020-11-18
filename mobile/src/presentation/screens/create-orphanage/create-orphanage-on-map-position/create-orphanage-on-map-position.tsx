import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { MapEvent, Marker } from 'react-native-maps'

import mapMarkerImg from '../../../../../assets/map-marker.png'
import styles from './create-orphanage-on-map-position-styles'

export default function CreateOrphanageOnMapPosition () {
  const navigation = useNavigation()
  const [position, setPosition] = useState({ latitude: 91, longitude: 181 })

  function handleNextStep () {
    navigation.navigate('CreateOrphanageFormStepOne', { position })
  }

  function handleSelectMapPosition (event: MapEvent) {
    setPosition(event.nativeEvent.coordinate)
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -3.2081546,
          longitude: -52.2262043,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 91 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        )}
      </MapView>

      {position.latitude !== 91 && (

        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}
