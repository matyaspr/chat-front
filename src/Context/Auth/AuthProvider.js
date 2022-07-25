import { useCallback, useContext, useState } from "react";
import { ChatContext } from "../Chat/ChatContext";
import { fetchWithoutToken, fetchWithToken } from "../../Helpers/fetchAPI";
import { AuthContext } from "./AuthContext";
import { types } from "../../Types/ChatTypes";

const initialState = {
  uid: null,
  name: null,
  email: null,
  isLogged: false,
  isAuthenticated: false,
};



export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext( ChatContext );



  const login = async ( email, password ) => {
    const response = await fetchWithoutToken( '/login', { email, password } , 'POST' );
    
    if ( response.status ) {
        localStorage.setItem('token', response.token);
        const { uid, name, email} = response.user;
        setAuth({
          uid,
          name,
          email,
          isLogged: true,
          isAuthenticated: true,
        });
    }
    return response;
  }


  const logout = () => {
      localStorage.removeItem('token');
      dispatch({
        type: types.CLEAR_CHAT,
      });
      setAuth(initialState);
  } 

  
  const register = async( name, email, password ) => {
    const response = await fetchWithoutToken( '/login/new', { name, email, password } , 'POST' );
    
    if ( response.status ) {
        localStorage.setItem('token', response.token);
        const { uid, name, email} = response.user;
        setAuth({
          uid,
          name,
          email,
          isLogged: true,
          isAuthenticated: true,
        });
    }
    return response;
  }


  const checkToken = useCallback( () => { 
      const token = localStorage.getItem('token');
      if ( !token ) {
        setAuth({
          isLogged: false,
          isAuthenticated: false,
        });
        return false;
      }

      const response = fetchWithToken( '/login/revalidate', {}, 'GET' );

      if ( response.status ) {
        localStorage.setItem('token', response.token);
        const { uid, name, email} = response.user;
        setAuth({
          uid,
          name,
          email,
          isLogged: true,
          isAuthenticated: true,
        });
        return true;
      } else {
        setAuth({
          isLogged: false,
          isAuthenticated: false,
        });
        return false;
      }
    } , [] );


  return (
    <AuthContext.Provider value={{
        auth, 
        login,
        logout,
        register,
        checkToken,
      }}>
      { children }
    </AuthContext.Provider >
  )
}
