import React from 'react'
import { Link } from 'react-router-dom'

import './create-orphanage-success.css'

function CreateOrphanageSuccess () {
  return (
    <div id="create-orphanage-success-view">
      <div className="success-wrapper">
        <main>
          <h1>Ebaaa!</h1>
          <p>O cadastro deu certo e foi enviado
             ao administrador para ser aprovado.
             Agora é só esperar {':)'}
          </p>

          <Link to="/app" className="back-to-map">Voltar para o mapa</Link>
        </main>
      </div>
    </div>
  )
}

export default CreateOrphanageSuccess
