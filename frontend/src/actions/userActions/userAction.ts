import { USER_lOGIN_FAIL, USER_lOGIN_REQUEST, USER_lOGIN_SUCCESS } from "../../reduxTypes/userTypes";

export const login = (email: string, password: string) => async (dispatch: any) => {
    // while I dont have backend, just save an id on localstorage

    try {
        dispatch({
            type: USER_lOGIN_REQUEST
        })

        const data = {userId: 'abcd1234', userName: 'Matheus Vaillant'};

        dispatch({
            type: USER_lOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_lOGIN_FAIL,
            error: 'something went wrong'
        })
    }
}