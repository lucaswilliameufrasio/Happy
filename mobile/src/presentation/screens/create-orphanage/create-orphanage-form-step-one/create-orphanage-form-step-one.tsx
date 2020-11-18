import React, { useState } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'

import styles from './create-orphanage-form-step-one-styles'
import { getImageFileExtension, getImageFileName } from '../../../helpers/file-helper'

type RouteParams = {
  position: {
    latitude: number
    longitude: number
  }
}

type ImageObjectShape = {
  type: string
  name: string
  uri: string
}

type FirstStepParams = {
  name: string
  about: string
  whatsapp: string
  images: ImageObjectShape[]
}

export default function CreateOrphanageFormStepOne () {
  const [state, setState] = useState<FirstStepParams>({
    name: '',
    about: '',
    whatsapp: '',
    images: []
  })

  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params as RouteParams

  function processImageData (uri: string): ImageObjectShape {
    const fileName = getImageFileName(uri)
    let fileExtension = getImageFileExtension(uri)

    fileExtension = fileExtension === 'heic' ? 'jpg' : fileExtension

    return {
      type: `image/${fileExtension}`,
      name: fileName,
      uri: uri
    }
  }

  async function handleSelectImages () {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

    if (status !== 'granted') {
      alert('Eita, precisamos de acesso às suas fotos...')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (result.cancelled) return

    const { uri: image } = result

    const processedImaged = processImageData(image)

    setState({ ...state, images: [...state.images, processedImaged] })
  }

  function handleImageRemotion (imageIndex: number) {
    setState({ ...state, images: state.images.filter((image, index) => index !== imageIndex) })
  }

  function handleNextStep () {
    navigation.navigate('CreateOrphanageFormStepTwo', {
      name: state.name,
      about: state.about,
      whatsapp: state.whatsapp,
      images: state.images,
      position: params.position
    })
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
        <Text style={styles.title}>Dados</Text>
        <Text style={styles.pageIndicator}>
          <Text style={styles.currentPage}>01</Text>
          <Text>  -  02</Text>
        </Text>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={state.name}
        onChangeText={value => handleChange(value, 'name')}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, styles.multiLineInput]}
        multiline
        onChangeText={value => handleChange(value, 'about')}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange(value, 'whatsapp')}
      />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {state.images.map((image, index) => (
          <LinearGradient
            colors={['#A1E9C5', '#FFC2D8']}
            start={{ x: 0.2, y: 0.5 }}
            end={{ x: 0.9, y: 0.5 }}
            key={image.name}
            style={styles.uploadedImageContainerGradient}
          >
            <LinearGradient
              colors={['#EDFFF6', '#FCF0F4']}
              start={{ x: 0.2, y: 0.5 }}
              end={{ x: 0.9, y: 0.5 }}
              style={styles.uploadedImageContainer}
            >

              <View style={styles.uploadedImageInfo}>
                <Image
                  source={{ uri: image.uri }}
                  style={styles.uploadedImage}
                />

                <Text numberOfLines={1} style={styles.uploadedImageName}>{image.name}</Text>
              </View>

              <BorderlessButton style={styles.removeUploadedImageButton} onPress={() => handleImageRemotion(index)}>
                <Feather name="x" size={24} color="#FF669D" />
              </BorderlessButton>
            </LinearGradient>
          </LinearGradient>
        ))}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </ScrollView>
  )
}
