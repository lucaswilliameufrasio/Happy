import React, { useState } from 'react'
import Context from '@/presentation/contexts/form/form-context'

import { Sidebar, FormImagesInput, FormInput, FormTextarea, FormMap, FormButtonSelect } from '@/presentation/components'

import './add-orphanage.css'

export default function AddOrphanage () {
  const [state, setState] = useState({
    name: '',
    about: '',
    whatsapp: '',
    images: [],
    instructions: '',
    opening_hours: '',
    open_on_weekends: true,
    position: {
      latitude: null,
      longitude: null
    },
    nameError: null,
    aboutError: null,
    whatsappError: null,
    imagesError: null,
    instructionsError: null,
    opening_hoursError: null,
    open_on_weekendsError: null,
    positionError: null
  })

  return (
    <div id="page-add-orphanage">
      <Sidebar />

      <main>
        <Context.Provider value={{ state, setState }} >

          <form className="add-orphanage-form">
            <fieldset>
              <legend>Dados</legend>

              <FormMap name="position"/>

              <FormInput name="name" labelContent="Nome" />

              <FormTextarea name="about" labelContent={<>Sobre <span>Máximo de 300 caracteres</span></>} maxLength={300} />

              <FormInput name="whatsapp" labelContent="Número de Whatsapp" />

              <FormImagesInput name="images" />

            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <FormTextarea name="instructions" labelContent="Instruções" />

              <FormInput name="opening_hours" labelContent="Horário das visitas" />

              <FormButtonSelect name="open_on_weekends" firstButtonTitle="Sim" secondButtonTitle="Não"/>
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
