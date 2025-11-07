import React from 'react'

import './HeaderFilmes.css'

interface HeaderFilmesProps {
  image: string;
}


const HeaderFilmes: React.FC<HeaderFilmesProps> = ({ image }) => {
  return (
      <div className='header-filmes'>
        <div className='header-filmes-titulo'>
            <h1 className='h1-header-filmes-titulo'>Bumblebee</h1>
            <h1 className='h1-header-filmes-subtitulo'>Titulo original Bumblebee</h1>
        </div>

        <div className='row-buttons-filmes'>
            <button className='buttons-filmes-deletar'>Deletar</button>
            <button  className='buttons-filmes-editar'>Editar</button>
        </div>

         <img className="bannerFilmes" src={image} alt="Banner do filme" />

        </div>
  )
}

export default HeaderFilmes