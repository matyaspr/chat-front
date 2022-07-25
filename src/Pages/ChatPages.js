import { useContext } from "react";
import { ChatSelect } from "../Components/ChatSelect";
import { InboxPeople } from "../Components/InboxPeople";
import { Messages } from "../Components/Messages";
import { ChatContext } from "../Context/Chat/ChatContext";

import "../css/chat.css";



export const ChatPages = () => {

  const { chatState } = useContext( ChatContext ); 

  return (
    <div className="messaging">
        <div className="inbox_msg">
            <InboxPeople />
            {
              ( chatState.activeChat )
                ? <Messages />
                : <ChatSelect />
            }
            
        </div>
    </div>
  )

}
