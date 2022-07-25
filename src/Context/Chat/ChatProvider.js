import { useReducer } from "react"
import { ChatContext } from "./ChatContext"
import { ChatReducer } from "./ChatReducer";


const initialState = {
    uid: '',
    activeChat: null, // uid del usuario al que quiero enviar mensajes
    users: [], //todos los usuarios de la base de datos
    messages: [], //todos los mensajes de la base de datos
}


export const ChatProvider = ({ children }) => {
  
    const [ chatState, dispatch ] = useReducer( ChatReducer, initialState );




    return (
        <ChatContext.Provider value={{ 
            chatState,
            dispatch,
         }}>
            { children }
        </ChatContext.Provider>
  )
}
