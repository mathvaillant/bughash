import { useRef, useEffect } from 'react';

const useEventListener = (eventName, handler, element = window) => {
    const saveHandler = useRef(null);

    useEffect(() => {
        saveHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        // Check if element supports the addEventListener
        const isSupported = !!(element && element.addEventListener);
        if(!isSupported) return;
        
        if(saveHandler.current) {
            const eventListener = (event) => saveHandler.current(event); 

            element.addEventListener(eventName, eventListener);

            return () => {
                element.removeEventListener(eventName, eventListener);
            }
        }

    }, [eventName, element])
}

export default useEventListener;