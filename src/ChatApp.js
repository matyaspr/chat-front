import React from 'react'
import { AuthProvider } from './Context/Auth/AuthProvider'
import { ChatProvider } from './Context/Chat/ChatProvider'
import { SocketProvider } from './Context/Socket/SocketContext'
import { AppRouter } from './Router/AppRouter'

import  moment from 'moment';
import 'moment/locale/es';
moment.locale( "es" );

export const ChatApp = () => {
  return (
    <ChatProvider>
        <AuthProvider>
          <SocketProvider>
            <AppRouter />
          </SocketProvider>
        </AuthProvider>
    </ChatProvider>  
  )
}
