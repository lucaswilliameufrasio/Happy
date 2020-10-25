import React from 'react'

import './spinner.css'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC = (props: Props) => {
  return (
    <div {...props} data-testid="spinner" className={`spinner ${props.className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
