import React from 'react'

import '../assets/css/Global.css'
import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import FiltrosInicio from '../components/feautures/FiltrosInicio/FiltrosInicio'
import FilmesCartaz from '../components/feautures/FilmesCartaz/FilmesCartaz'
import Paginacao from '../components/feautures/Paginacao/Paginacao'

function Inicio() {
  return (
    <div>

    <Header />

    <div className='background-overlay' />

    <div className='container-filmecartaz'>

        <FiltrosInicio />
        <FilmesCartaz />
        <Paginacao />

    </div>

    <Footer />

    </div>
  )
}

export default Inicio