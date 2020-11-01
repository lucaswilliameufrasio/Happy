import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

import './form-status.css'

function FormStatus () {
  const { state } = useContext(Context)

  return (
    <div data-testid="error-wrap" className="error-wrap">
      {state.mainError && <span data-testid="main-error" className="error-message">{state.mainError}</span> }
    </div>
  )
}

export default FormStatus
