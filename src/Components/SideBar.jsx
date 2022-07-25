import { useContext } from "react"
import { AuthContext } from "../Context/Auth/AuthContext";
import { ChatContext } from "../Context/Chat/ChatContext"
import { ChatAvailableItem } from "./ChatAvailableItem"


export const SideBar = () => {
  
    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );

    return (
        <div className="inbox_chat">

           {/* <!-- conversación activa inicio --> */}

           {
                chatState.users
                    .filter( user => user.uid !== auth.uid)
                    .map( (user) => 
                        <ChatAvailableItem 
                            key={ user.uid }
                            user={ user } 
                        /> )
           }
            
           {/* <!-- Espacio extra para scroll --> */}
           <div className="extra_space"></div>
       </div>
       
    )
}
