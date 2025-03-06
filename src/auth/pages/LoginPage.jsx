import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';


const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}


export const LoginPage = () => {

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const {
        loginEmail, 
        loginPassword, 
        onInputChange : onLoginInputChange
    } = useForm(loginFormFields); 

    const {
        registerName, 
        registerEmail, 
        registerPassword, 
        registerPassword2, 
        onInputChange : onRegisterChange
    } = useForm(registerFormFields); 

    const loginSubmit = (event) => {
        event.preventDefault();
        console.log({loginEmail, loginPassword});
        startLogin({email: loginEmail, password: loginPassword});
    }

    const registerSubmit = (event) => {
        event.preventDefault();
        if(registerPassword !== registerPassword2){
            return Swal.fire('Error en el registro', 'Las contraseñas deben ser iguales', 'error');
        }
        startRegister({email: registerEmail, password: registerPassword, name: registerName});

        console.log({registerName, registerEmail, registerPassword, registerPassword2})
    }

    useEffect(() => {
      if(errorMessage !== undefined){
            Swal.fire('Error en la autenticación', errorMessage, 'error')
      }
    }, [errorMessage])
    

    return (
        <div className="container-fluid login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Iniciar sesión</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="loginEmail" className="form-label visually-hidden">Correo electrónico</label>
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="usuario@calendar.app"
                                id="loginEmail"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="loginPassword" className="form-label visually-hidden">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="**********"
                                id="loginPassword"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Ingresar" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Crear cuenta</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="registerName" className="form-label visually-hidden">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Dario Calen"
                                id="registerName"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="registerEmail" className="form-label visually-hidden">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="usuario@calendar.app"
                                id="registerEmail"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="registerPassword" className="form-label visually-hidden">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña de 10 dígitos"  
                                id="registerPassword"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="registerPassword2" className="form-label visually-hidden">Confirmar contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirmar contraseña" 
                                id="registerPassword2"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}