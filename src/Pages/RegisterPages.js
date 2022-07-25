import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/Auth/AuthContext';

export const RegisterPages = () => {

  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
      });
      return;
    }

    const response = await register(form.name, form.email, form.password, form.password2);
    
    if ( !response.status ) {
      const { message } = response;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: typeof message === 'string' ? message : 'Verifique usuario y contraseña',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Usuario registrado correctamente',
      })
    }
  }


  return (
    <form 
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleSubmit}
      >
        <span 
          className="login100-form-title mb-3">
            Chat - Registro
        </span>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="text"
            name="name"
            placeholder="Nombre" 
            onChange={ handleChange }
            value={ form.name }
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="email"
            name="email"
            placeholder="Email" 
            onChange={ handleChange }
            value={ form.email }
          />
          <span className="focus-input100"></span>
        </div>
        
        <div className="wrap-input100 validate-input mb-3">
          <input 
            className="input100" 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={ handleChange }
            value={ form.password }
          />
          <span 
            className="focus-input100">
          </span>
        </div>
        
        <div className="wrap-input100 validate-input mb-3">
          <input 
            className="input100" 
            type="password" 
            name="password2" 
            placeholder="Confirm Password" 
            onChange={ handleChange }
            value={ form.password2 }
          />
          <span 
            className="focus-input100">
          </span>
        </div>
        

        <div className="row mb-3">
          <div className="col text-right">
            <Link 
              to="/auth/login" 
              className="txt1">
                Ya tienes cuenta?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button 
            type="submit"  
            className="login100-form-btn">
              Crear cuenta
          </button>
        </div>

    </form>
  )
}
