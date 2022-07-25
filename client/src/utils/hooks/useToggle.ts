import { useCallback, useState } from "react";

const useToggle = (initialToggleState = false): [state: boolean, toggleState: () => void] => {
    const [state, setState] = useState<boolean>(initialToggleState);

    const toggleState = useCallback(() => setState(!state), [state]);


    return [state, toggleState];
}

export default useToggle;