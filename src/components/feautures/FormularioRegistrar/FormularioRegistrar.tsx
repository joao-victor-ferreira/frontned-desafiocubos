import React from 'react'


import './FormularioRegistrar.css'
import './FormularioRegistrar.css'

function FormularioRegistrar() {
  return (
    <div className='login-form-container'>


        <div className='background-overlay' />

    <form className='registrar-form'>
    
        <div className='forms-group'>
        <label htmlFor='username' className='form-label'>Nome</label>
        <input type='text' id='username' className='form-input' placeholder='Enter your username' />
            </div>

             <div className='forms-group'>
        <label htmlFor='username' className='form-label'>E-mail</label>
        <input type='text' id='username' className='form-input' placeholder='Enter your username' />
            </div>


        <div className='forms-group'>
        <label htmlFor='password' className='form-label'>Senha</label>
        <input type='password' id='password' className='form-input' placeholder='Enter your password' />
        </div>

         <div className='forms-group'>
        <label htmlFor='password' className='form-label'>Confirmação da senha</label>
        <input type='password' id='password' className='form-input' placeholder='Enter your password' />
        </div>


        <div className='row-options-form'>

           
          <button type='submit' className='login-form-btn'>Entrar</button>


        </div>
      
    </form>




    </div>
  )
}

export default FormularioRegistrar