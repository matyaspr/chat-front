import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/Auth/AuthContext';
import { ChatContext } from '../Context/Chat/ChatContext';
import { SocketContext } from '../Context/Socket/SocketContext';


export const SendMessages = () => {
    const [message, setMessage] = useState('');
    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);
    const { socket } = useContext(SocketContext);

    const handleChange = ({ target }) => {
        setMessage(target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( message.length === 0 ) return;
        
        setMessage('');
        // TODO: emitir un evento de socket para enviar el mensaje
        socket.emit( 'personal-message', {
            message,
            from: auth.uid,
            to: chatState.activeChat
        })

        // TODO: hacer el dispatch del mensaje
    }
    
    return (
        <form 
            onSubmit={ handleSubmit }
        >
            <div className="type_msg row">
                {/* <!-- Enviar mensaje Inicio --> */}
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        value={ message }
                        onChange={ handleChange }
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    
    )
}
