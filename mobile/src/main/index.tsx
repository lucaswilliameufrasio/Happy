import { registerRootComponent } from 'expo'
import React from 'react'
import { useFonts } from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'
import { ActivityIndicator } from 'react-native'
import OrphanagesMap from '../presentation/screens/orphanages-map/orphanages-map'

function Main (): JSX.Element {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  })

  if (!fontsLoaded) {
    return <ActivityIndicator />
  }

  return (
    <OrphanagesMap />
  )
}

registerRootComponent(Main)
