import { types } from "../../Types/ChatTypes"


/*
const initialState = {
    uid: '',
    activeChat: null, // uid del usuario al que quiero enviar mensajes
    users: [], //todos los usuarios de la base de datos
    messages: [], //todos los mensajes de la base de datos
}
*/


export const ChatReducer = (state, action) => {

    switch (action.type) {

        case types.USER_LOADED:
            return {
                ...state,
                users: [...action.payload ]
            }
        
        case types.SET_ACTIVE_CHAT:
            // si el chat activo es el mismo al q tengo seleccionado
            if (state.activeChat === action.payload) {
                return state
            }
                
            return {
                ...state,
                activeChat: action.payload,   // registra el uid
                messages: []
            }
            
        case types.SET_MESSAGE:
            console.log("action.payload ", action.payload.msg.message);
            console.log("action.payload.msg ", action.payload.msg);
            if( state.activeChat === action.payload.msg.from || 
                state.activeChat === action.payload.msg.to ) {
                    const object = {
                        ...state,
                        messages: [...state.messages, action.payload.msg]  //agrego los mensajes al arreglo
                    }
                    console.log("igualdad  ", object);
                return object;
            }else{
                return state;
            }
        
        case types.UPLOAD_MESSAGES:
            return {
                ...state,
                messages: [...action.payload]
            }

        case types.CLEAR_CHAT:
            return {
                uid: '',
                activeChat: null, // uid del usuario al que quiero enviar mensajes
                users: [], //todos los usuarios de la base de datos
                messages: [], //todos los mensajes de la base de datos
            }


        default:
            return state;
    }

}
