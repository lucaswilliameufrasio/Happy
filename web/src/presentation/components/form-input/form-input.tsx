import React, { useContext } from 'react'

import Context from '@/presentation/contexts/form/form-context'

import './form-input.css'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelcontent?: string | React.ReactNode
}

function FormInput (props: Props) {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className="form-input-block">
      <label htmlFor={props.name}>{props.labelcontent}</label>
      <input data-testid={props.name} {...props} className={error ? 'input-highlighted-error' : ''} id={props.name} onChange={handleChange}/>
      {error && <span data-testid={`${props.name}-error`} className="form-input-span-error">{error}</span>}
    </div>
  )
}

export default FormInput
