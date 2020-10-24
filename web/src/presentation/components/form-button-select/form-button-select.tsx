import React, { useContext } from 'react'

import Context from '@/presentation/contexts/form/form-context'

import './form-button-select.css'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  'label-content'?: string | React.ReactNode
  firstButtonTitle: string
  secondButtonTitle: string
}

function FormButtonSelect (props: Props) {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  const handleClick = (value: boolean): void => {
    setState({
      ...state,
      [props.name]: value
    })
  }

  return (
    <div className="select-button-block">
      <label htmlFor={props.name}>Atende fim de semana</label>

      <div className={error ? 'button-select-highlighted-error button-select' : 'button-select'}>
        <button type="button" className={state[props.name] ? 'active' : ''} onClick={() => handleClick(true)}>{props.firstButtonTitle}</button>
        <button type="button" className={!state[props.name] ? 'active' : ''} onClick={() => handleClick(false)}>{props.secondButtonTitle}</button>
      </div>
      {error && <span data-testid={`${props.name}-error`} className="select-button-span-error">{error}</span>}
    </div>
  )
}

export default FormButtonSelect
