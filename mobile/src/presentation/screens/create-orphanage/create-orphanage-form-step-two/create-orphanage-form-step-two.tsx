import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import styles from './create-orphanage-form-step-two-styles'

type RouteParams = {
  position: {
    latitude: number
    longitude: number
  }
  name: string
  about: string
  whatsapp: string
  images: Array<{
    type: string
    name: string
    uri: string
  }>
}

type SecondStepParams = {
  instructions: string
  openingHours: string
  openOnWeekends: boolean | null
}

function CreateOrphanageFormStepTwo () {
  const [state, setState] = useState<SecondStepParams>({
    instructions: '',
    openingHours: '',
    openOnWeekends: null
  })

  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params as RouteParams

  function handleCreateOrphanage () {
    console.log({ ...params, ...state })
    navigation.navigate('OrphanagesMap')
  }

  function handleSelectOpenOnWeekendsOption (option: boolean) {
    setState({ ...state, openOnWeekends: option })
  }

  function handleChange (value: string, inputName: string) {
    setState({
      ...state,
      [inputName]: value
    })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Visitação</Text>
        <Text style={styles.pageIndicator}>
          <Text>01  -  </Text>
          <Text style={styles.currentPage}>02</Text>
        </Text>
      </View>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, styles.multiLineInput]}
        multiline
        onChangeText={value => handleChange(value, 'instructions')}

      />

      <Text style={styles.label}>Horário de visitas</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange(value, 'openingHours')}
      />

      <View style={styles.selectContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <View style={styles.selectButtonContainer}>
          <TouchableOpacity
            onPress={() => handleSelectOpenOnWeekendsOption(true)}
            style={[styles.selectFirstButton, state.openOnWeekends !== null && state.openOnWeekends && styles.selectedFirstButton]}
          >
            <Text style={[styles.selectButtonText, state.openOnWeekends !== null && state.openOnWeekends && styles.selectedFirstButtonText]}>Sim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSelectOpenOnWeekendsOption(false)}
            style={[styles.selectSecondButton, state.openOnWeekends !== null && !state.openOnWeekends && styles.selectedSecondButton]}
          >
            <Text style={[styles.selectButtonText, state.openOnWeekends !== null && !state.openOnWeekends && styles.selectedSecondButtonText]}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>

      <RectButton style={styles.confirmButton} onPress={handleCreateOrphanage}>
        <Text style={styles.confirmButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

export default CreateOrphanageFormStepTwo
