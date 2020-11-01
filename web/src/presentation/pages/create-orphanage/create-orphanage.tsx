import React, { useEffect, useState } from 'react'

import { Validation } from '@/presentation/protocols'
import Context from '@/presentation/contexts/form/form-context'
import { Sidebar, FormImagesInput, FormInput, FormTextarea, FormMap, FormButtonSelect, FormStatus } from '@/presentation/components'
import { AddOrphanage as AddOrphanageUseCase } from '@/domain/usecases/add-orphanage'

import './create-orphanage.css'
import Spinner from '@/presentation/components/spinner/spinner'

type Props = {
  validation: Validation
  addOrphanage: AddOrphanageUseCase
}

type Params = {
  isLoading: boolean
  isFormInvalid: boolean
  name: string
  about: string
  whatsapp: string
  images: File[]
  instructions: string
  openingHours: string
  openOnWeekend: boolean
  position: {
    latitude: number
    longitude: number
  }
  mainError: string
  nameError: string
  aboutError: string
  whatsappError: string
  imagesError: string
  instructionsError: string
  openingHoursError: string
  openOnWeekendError: string
  positionError: string
}

function AddOrphanage ({ validation, addOrphanage }: Props) {
  const [state, setState] = useState<Params>({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    about: '',
    whatsapp: '',
    images: [],
    instructions: '',
    openingHours: '',
    openOnWeekend: true,
    position: {
      latitude: null,
      longitude: null
    },
    mainError: null,
    nameError: null,
    aboutError: null,
    whatsappError: null,
    imagesError: null,
    instructionsError: null,
    openingHoursError: null,
    openOnWeekendError: null,
    positionError: null
  })

  function validateForm () {
    const { name, about, whatsapp, images, instructions, openOnWeekend, openingHours, position } = state
    const formData = { name, about, whatsapp, images, instructions, openOnWeekend, openingHours, position }
    const nameError = validation.validate('name', formData)
    const aboutError = validation.validate('about', formData)
    const whatsappError = validation.validate('whatsapp', formData)
    const imagesError = validation.validate('images', formData)
    const instructionsError = validation.validate('instructions', formData)
    const openOnWeekendError = validation.validate('openOnWeekend', formData)
    const openingHoursError = validation.validate('openingHours', formData)
    const latitudeError = validation.validate('latitude', formData.position)
    const longitudeError = validation.validate('longitude', formData.position)
    const positionError = longitudeError || latitudeError || (latitudeError && longitudeError && `${latitudeError}, ${longitudeError}`)
    const formIsInvalid = !!nameError || !!aboutError || !!whatsappError || !!imagesError || !!instructionsError || !!openOnWeekendError || !!openingHoursError || !!positionError

    setState({
      ...state,
      nameError,
      aboutError,
      whatsappError,
      imagesError,
      instructionsError,
      openOnWeekendError,
      openingHoursError,
      positionError,
      isFormInvalid: formIsInvalid
    })
  }

  useEffect(() =>
    validateForm(),
  [state.name, state.about, state.whatsapp, state.images, state.instructions, state.openOnWeekend, state.openingHours, state.position])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({ ...state, isLoading: true })

      await addOrphanage.add({
        name: state.name,
        about: state.about,
        whatsapp: state.whatsapp,
        images: state.images,
        instructions: state.instructions,
        latitude: state.position.latitude,
        longitude: state.position.longitude,
        open_on_weekend: state.openOnWeekend,
        opening_hours: state.openingHours
      })
    } catch (error) {
      setState({
        ...state,
        mainError: error.message
      })
    }
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <Context.Provider value={{ state, setState }} >

          <form data-testid="form" className="create-orphanage-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Dados</legend>

              <FormMap name="position" centerLatitude={-3.2081546} centerLongitude={-52.2261614} />

              <FormInput name="name" label-content="Nome" />

              <FormTextarea name="about" label-content={<>Sobre <span>Máximo de 300 caracteres</span></>} maxLength={300} />

              <FormInput name="whatsapp" label-content="Número de Whatsapp" />

              <FormImagesInput name="images" />

            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <FormTextarea name="instructions" label-content="Instruções" />

              <FormInput name="openingHours" label-content="Horário das visitas" />

              <FormButtonSelect name="openOnWeekend" firstButtonTitle="Sim" secondButtonTitle="Não" />
            </fieldset>

            <button className="confirm-button" type="submit">
              {state.isLoading ? <Spinner /> : 'Confirmar'}
            </button>

            <FormStatus />
          </form>

        </Context.Provider>
      </main>
    </div>
  )
}

export default AddOrphanage
