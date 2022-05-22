import React from "react";
import _ from "underscore";

const useDeviceDetect = (): {isMobile: boolean} => {
    const [isMobile, setIsMobile] = React.useState<boolean>(false);

    React.useEffect(() => {
        const userAgent = _.isUndefined(window.navigator) ? '' : navigator.userAgent;

        const mobile = userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

        setIsMobile(Boolean(mobile)); 
    }, []);

    return {isMobile};
}

export default useDeviceDetect;