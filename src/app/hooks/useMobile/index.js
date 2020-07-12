import {useEffect, useState} from "react";

const isMobile = () => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        if(window){
            window.addEventListener('resize', _resize)
        }

        _resize();

        return function cleanup(){
            if(window) {
                window.removeEventListener('resize', _resize)
            }
        }

    }, []);

    const _resize = () => {
        if(!window) return false;
        const displayWidth = window.innerWidth;

        setIsMobile(displayWidth < 1024);
    };

    return isMobile;
};

export default isMobile;
