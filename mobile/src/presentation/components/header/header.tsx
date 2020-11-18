import React from 'react'
import { View, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import styles from './header-styles'

type Props = {
  title: string
  showCancel?: boolean
}

function Header ({ title, showCancel = true }: Props): JSX.Element {
  const navigation = useNavigation()

  function handleBackToAppInitialScreen (): void {
    navigation.navigate('OrphanagesMap')
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15B6D6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleBackToAppInitialScreen}>
          <Feather name="x" size={24} color="#FF669D" />
        </BorderlessButton>
      ) : (
        <View style={styles.hiddenContainer}/>
      )}
    </View>
  )
}

export default Header
