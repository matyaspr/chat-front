import { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../../Hooks/useSocket'
import { AuthContext } from '../Auth/AuthContext';
import { ChatContext } from '../Chat/ChatContext';
import { types } from '../../Types/ChatTypes';
import { scrollToBottomAnimated } from '../../Helpers/ScrollToBotton';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
    const { socket, 
            online, 
            disconnectSocket, 
            connectSocket } = useSocket('http://localhost:8080');
    
    const { auth } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);


    useEffect(() => {
        if (auth.isLogged) {
            connectSocket();
        }
    }, [auth, connectSocket]);
    
    useEffect(() => {
        if (!auth.isLogged) {
            disconnectSocket();
        }
    }, [auth, disconnectSocket]);
    
    // escuchar los cambios en los usuarios conectados 
    useEffect(() => {
        socket?.on('list-users', ( users ) => {
            dispatch({
                type: types.USER_LOADED,
                payload: users
            });
        })
    }, [socket, dispatch]);


    // escuchar los cambios en los mensajes
    useEffect(() => {
        socket?.on('personal-message', ( msg ) => {
            //TODO: dispatch de una accion
            dispatch({
                type: types.SET_MESSAGE,
                payload: msg
            });

            //TODO: mover el scroll al final
            scrollToBottomAnimated('msg_history');
        })
    }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}