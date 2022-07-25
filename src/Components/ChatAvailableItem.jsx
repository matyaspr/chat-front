import { useContext } from "react";
import { ChatContext } from "../Context/Chat/ChatContext";
import { fetchWithToken } from "../Helpers/fetchAPI";
import { scrollToBottom } from "../Helpers/ScrollToBotton";
import { types } from "../Types/ChatTypes";




export const ChatAvailableItem = ({ user }) => {
  
    const { dispatch, chatState } = useContext( ChatContext );
    const { activeChat } = chatState;


    const handleClick = async() => {
        dispatch({
            type: types.SET_ACTIVE_CHAT,
            payload: user.uid
        })

        //TODO: cargar los mensajes del chat
        try {
            const response = await fetchWithToken(`/message/${user.uid}`);
            console.log(response);
            dispatch({
                type: types.UPLOAD_MESSAGES,
                payload: response.message,
            })
        } catch (error) {
            console.log(error);
        }

        //TODO: movel el scroll         
        scrollToBottom("msg_history");
    }


    return (        
        <div 
          onClick={ handleClick } 
          className={`chat_list ${ (user.uid === activeChat) && 'active_chat' } `} >  {/* TODO: active_chat clase activa */}
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{ user.name }</h5>
                    {
                        user.online
                        ? <span className="text-success">Online</span>
                        : <span className="text-danger">Offline</span>
                    }
                    
                </div>
            </div>
        </div>        
    )
}
