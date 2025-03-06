import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { onLogoutCalendar } from "../store";




export const useAuthStore = () => {

    
    const {status, user, errorMessage} = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        dispatch(onChecking());

        try {
            
            const {data} = await calendarApi.post('/auth/', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async({email, password, name}) => {
        dispatch(onChecking());

        try {
            
            const {data} = await calendarApi.post('/auth/new', {email, password, name});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            dispatch(onLogout(error.response.data.msg || 'Error al registrar usuario, verifique la info:('));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout()); // 
    
        try {
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid})) // Corregí aquí: data a data.uid
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }
    //FIX: Corregir escenrio servidor caido

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }


    return {
        //* Properties
        status,
        user,
        errorMessage,

        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }


}