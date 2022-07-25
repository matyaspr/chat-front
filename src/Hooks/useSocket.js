import { useCallback, useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {
    
    // const socket = useMemo(() => io.connect( serverPath, {transports: ['websocket']} ), [ serverPath ] );
    const [socket, setSocket] = useState(null);
    const [ online, setOnline ] = useState(false);


    const connectSocket = useCallback(() => {
        const socketTmp = io.connect( serverPath, { 
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,         // force a new connection
            query: {
                'token': localStorage.getItem('token')
            }
        } );
        setSocket(socketTmp);
    }, [ serverPath ]);


    const disconnectSocket = useCallback(() => {
        socket?.disconnect();
        setSocket(socket);
    }, [ socket ]);



    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])


    return {
        socket,
        online,
        connectSocket,
        disconnectSocket
    }
}