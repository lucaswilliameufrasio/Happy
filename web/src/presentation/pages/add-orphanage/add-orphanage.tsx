import React, { useState } from 'react'

import { Validation } from '@/presentation/protocols'
import Context from '@/presentation/contexts/form/form-context'
import { Sidebar, FormImagesInput, FormInput, FormTextarea, FormMap, FormButtonSelect } from '@/presentation/components'

import './add-orphanage.css'

type Props = {
  validation: Validation
}

function AddOrphanage ({ validation }: Props) {
  const [state, setState] = useState({
    name: '',
    about: '',
    whatsapp: '',
    images: [],
    instructions: '',
    openingHours: '',
    openOnWeekends: true,
    position: {
      latitude: null,
      longitude: null
    },
    nameError: null,
    aboutError: null,
    whatsappError: null,
    imagesError: null,
    instructionsError: null,
    openingHoursError: null,
    openOnWeekendsError: null,
    positionError: null
  })

  async function validateForm () {
    const { name, about, whatsapp, images, instructions, openOnWeekends, openingHours, position } = state
    const formData = { name, about, whatsapp, images, instructions, openOnWeekends, openingHours, position }
    const nameError = validation.validate('name', formData)
    const aboutError = validation.validate('about', formData)
    const whatsappError = validation.validate('whatsapp', formData)
    const imagesError = validation.validate('images', formData)
    const instructionsError = validation.validate('instructions', formData)
    const openOnWeekendsError = validation.validate('openOnWeekends', formData)
    const openingHoursError = validation.validate('openingHours', formData)
    const positionError = validation.validate('position', formData)

    setState({
      ...state,
      nameError,
      aboutError,
      whatsappError,
      imagesError,
      instructionsError,
      openOnWeekendsError,
      openingHoursError,
      positionError
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    await validateForm()
  }

  return (
    <div id="page-add-orphanage">
      <Sidebar />

      <main>
        <Context.Provider value={{ state, setState }} >

          <form data-testid="form" className="add-orphanage-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Dados</legend>

              <FormMap name="position"/>

              <FormInput name="name" label-content="Nome" />

              <FormTextarea name="about" label-content={<>Sobre <span>Máximo de 300 caracteres</span></>} maxLength={300} />

              <FormInput name="whatsapp" label-content="Número de Whatsapp" />

              <FormImagesInput name="images" />

            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <FormTextarea name="instructions" label-content="Instruções" />

              <FormInput name="openingHours" label-content="Horário das visitas" />

              <FormButtonSelect name="openOnWeekends" firstButtonTitle="Sim" secondButtonTitle="Não"/>
            </fieldset>

            <button className="confirm-button" type="submit">
            Confirmar
            </button>
          </form>
        </Context.Provider>
      </main>
    </div>
  )
}

export default AddOrphanage
