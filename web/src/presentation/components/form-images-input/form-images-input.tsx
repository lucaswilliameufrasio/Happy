import React, { ChangeEvent, useContext, useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'

import Context from '@/presentation/contexts/form/form-context'

import './form-images-input.css'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function FormImagesInput (props: Props) {
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  function handleSelectImages (event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const selectedImages = Array.from(event.target.files)
    setState({ ...state, [event.target.name]: [...state[event.target.name], ...selectedImages] })

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages([...previewImages, ...selectedImagesPreview])
    console.log(previewImages, state[event.target.name])
  }

  function handleImageRemotion (image: string) {
    setPreviewImages(previewImages.filter((previewImage, index) => {
      if (previewImage !== image) {
        return previewImage
      }

      const images = Array.from(state[props.name])
      setState({ ...state, [props.name]: images.filter((image, imageIndex) => imageIndex !== index) })
    }))
  }

  return (
    <div className="image-input-block">
      <label htmlFor="images">Fotos</label>

      <div className="images-container">
        {previewImages.map(image => {
          return (
            <div key={image} className="image-container" data-testid={`${props.name}-preview`}>
              <button type="button" className="remove-image" onClick={() => handleImageRemotion(image)}>
                <FiX size={24} color="#FF669D"/>
              </button>
              <img src={image} alt="Imagem"/>
            </div>
          )
        })}

        <label htmlFor="image[]" className={error ? 'new-image-highlighted-error new-image' : 'new-image'}>
          <FiPlus size={24} color="#15b6d6" />
        </label>
      </div>

      <input {...props} data-testid={props.name} multiple onChange={handleSelectImages} type="file" id="image[]"/>
      {error && <span data-testid={`${props.name}-error`} className="images-span-error">{error}</span>}

    </div>
  )
}

export default FormImagesInput
