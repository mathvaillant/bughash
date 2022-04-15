import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { Store } from "../../app/store";
export const useTypedSelector: TypedUseSelectorHook<Store> = useSelector;