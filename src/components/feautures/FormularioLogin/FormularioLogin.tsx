import React from 'react'


import './FormularioLogin.css'

function FormularioLogin() {
  return (
    <div className='login-form-container'>


        <div className='background-overlay' />

    <form className='login-form'>
    
        <div className='forms-group'>
        <label htmlFor='username' className='form-label'>Nome/E-mail</label>
        <input type='text' id='username' className='form-input' placeholder='Enter your username' />
            </div>


        <div className='forms-group'>
        <label htmlFor='password' className='form-label'>Senha</label>
        <input type='password' id='password' className='form-input' placeholder='Enter your password' />
        </div>


        <div className='row-options-form'>

            <h1 className='esqueceuasenha'>Esqueceu a senha</h1>
          <button type='submit' className='login-form-btn'>Entrar</button>


        </div>
      
    </form>




    </div>
  )
}

export default FormularioLogin