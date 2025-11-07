import React from 'react'

import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import FormularioRegistrar from '../components/feautures/FormularioRegistrar/FormularioRegistrar'
import '../assets/css/Global.css'

function Registrar() {
  return (
    <div>

    <Header />
   <FormularioRegistrar />
    <Footer />
     </div>
  )
}

export default Registrar