import React from 'react'

import './ClassificaoFilmes.css'

function ClassificaoFilmes() {
  return (
      <div className='classificacao-filmes'>
        <div className='classificacao-filmes-titulo'>
            <h1 className='h1-classificacao-filmes-subtitulo'>Todo herói tem um começo</h1>
        </div>

        <div className='div-buttons-classificacaofilmes'>

          <div className='indicativa-classificacao'>
            <h1 className='h1-indicativa-classificacao-titulo'>CLASSIFICAÇÃO INDICATIVA</h1>
            <h1  className='h1-indicativa-classificacao-subtitulo'>13 anos</h1>
          </div>

          <div  className='votos-classificacao'>
            <h1 className='h1-votos-classificacao-titulo'>VOTOS</h1>
            <h1 className='h1-votos-classificacao-subtitulo'>5704</h1>
          </div>


            <button  className='buttons-classificacaofilmes-editar'>Editar</button>


        </div>

        </div>
  )
}

export default ClassificaoFilmes