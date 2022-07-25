import React, { useContext } from 'react'
import { AuthContext } from '../Context/Auth/AuthContext'
import { ChatContext } from '../Context/Chat/ChatContext'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { SendMessages } from './SendMessages'

export const Messages = () => {
  
    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);




    return (
        
        <div className="mesgs">

            {/* <!-- Historia inicio --> */}
            <div
                id='msg_history' 
                className="msg_history">
                
            {
                chatState.messages.map( message => 
                    
                    ( message.to === auth.uid ) 
                        ? <IncomingMessage key={ message._id } message={ message } />
                        : <OutgoingMessage key={ message._id } message={ message } />        
            )}
                
            </div>

            <SendMessages />

        </div>
    )
}
