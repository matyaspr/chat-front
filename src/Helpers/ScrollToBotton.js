import { animateScroll as scroll } from 'react-scroll'


export const scrollToBottom = ( id ) => {
    scroll.scrollToBottom({
        duration: 0,
        containerId: id
    });
}


export const scrollToBottomAnimated = ( id ) => {
    scroll.scrollToBottom({
        duration: 250,
        containerId: id
    });
}