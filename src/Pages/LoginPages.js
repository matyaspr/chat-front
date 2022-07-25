import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/Auth/AuthContext';

export const LoginPages = () => {

  const { login } = useContext( AuthContext );

  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  useEffect(() => {
    const email = localStorage.getItem('email');
    if ( email ) {
      setForm( (form) => ({  
        ...form, 
        email, 
        rememberMe: true 
      }) );
    }
  }, []);
  

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleRememberme = (e) => {
    setForm({
      ...form,
      rememberMe: !form.rememberMe
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();  
    form.rememberMe
      ? localStorage.setItem('email', form.email)
      : localStorage.removeItem('email');
    //llamar al servicio de login backend
    let response = await login(form.email, form.password);
    if ( !response.status ) {
      const { message } = response;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: typeof message === 'string' ? message : 'Verifique usuario y contraseña',
      })
    }
  }
  

  const disabledSubmit = () => {
    return (!form.email || !form.password);
  }
  


  return (
    <form 
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={ handleSubmit }
    >
          <span className="login100-form-title mb-3">
            Chat - Ingreso
          </span>
          
          <div className="wrap-input100 validate-input mb-3">
            <input 
              className="input100"
              type="email"
              name="email"
              placeholder="Email"
              value={ form.email }
              onChange={ handleChange }
            />
            <span className="focus-input100"></span>
          </div>
          
          
          <div className="wrap-input100 validate-input mb-3">
            <input
              className="input100"
              type="password"
              name="password"
              placeholder="Password" 
              value={ form.password }
              onChange={ handleChange }
            />
            <span className="focus-input100"></span>
          </div>
          
          <div className="row mb-3">
            <div 
              className="col"
              onClick={ () => handleRememberme() }
            >
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="rememberMe"
                    checked={ form.rememberMe } 
                    readOnly
                  />
                  <label className="label-checkbox100">
                    Recordarme
                  </label>
            </div>

            <div className="col text-right">
            <Link 
                to="/auth/register" 
                className="txt1">
                  Nueva cuenta?
              </Link>
            </div>
          </div>

          <div className="container-login100-form-btn m-t-17">
            <button 
              type="submit"  
              className="login100-form-btn"
              disabled={ disabledSubmit() }
            >
                Ingresar
            </button>
          </div>

    </form>
  )
}
