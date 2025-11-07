import React from 'react'

import './SinopseFilmes.css'

function SinopseFilmes() {
  return (
    <div className='sinopse-filmes-container'>

        <div className='div1-sinopse-filmes'>

            <div className='div-sinopse-filmes'>
            <h1 className='h1-div-sinopse-filmes'>SINOPSE</h1>
            <h1  className='h2-div-sinopse-filmes'>“Bumblebee” é um filme que se passa em 1987 e conta a história de um Autobot chamado Bumblebee que encontra refúgio em um ferro-velho de uma pequena cidade praiana da Califórnia. Charlie, uma adolescente prestes a completar 18 anos, encontra Bumblebee machucado e sem condições de uso. Quando ela o revive, percebe que este não é qualquer fusca amarelo1. O filme é uma mistura de animação e drama, com um tom leve e divertido, e se destaca por sua ambientação nos anos 80 e pela trilha sonora perfeita2.</h1>
            </div>

            <div  className='div-generos-filmes'>
                <h1 className='h1-div-sinopse-filmes'>Generos</h1>

                <div className='row-generos-tipos'>
                    <h1 className='div-generos-tipos'>AÇÃO</h1>
                    <h1  className='div-generos-tipos'>AVENTURA</h1>   
                      <h1  className='div-generos-tipos'>FICÇÃO CIENTÍFICA</h1>    
                    
                </div>    
            </div> 
       
        </div>

        <div className='div2-sinopse-filmes'>
            <div className="info-row">
  <div className="info-col">
    <div className="info-card1">
      <div className="info-label">Lançamento</div>
      <div className="info-value">12/20/2018</div>
    </div>
  </div>
  <div className="info-col">
    <div className="info-card1">
      <div className="info-label">Duração</div>
      <div className="info-value">1h 53m</div>
    </div>
  </div>
</div>

<div className="info-row">
  <div className="info-col">
    <div className="info-card1">
      <div className="info-label">Situação</div>
      <div className="info-value">Lançado</div>
    </div>
  </div>
  <div className="info-col">
    <div className="info-card1">
      <div className="info-label">Idioma</div>
      <div className="info-value">Inglês</div>
    </div>
  </div>
</div>

<div className="info-row">
  <div className="info-col">
    <div className="info-card">
      <div className="info-label">Orçamento</div>
      <div className="info-value">$135M</div>
    </div>
  </div>
  <div className="info-col">
    <div className="info-card">
      <div className="info-label">Receita</div>
      <div className="info-value">$467.99M</div>
    </div>
  </div>
  <div className="info-col">
    <div className="info-card">
      <div className="info-label">Lucro</div>
      <div className="info-value">$332.99M</div>
    </div>
  </div>
</div>
        </div>

    </div>
  )
}

export default SinopseFilmes