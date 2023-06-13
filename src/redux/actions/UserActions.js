import {  toast } from "react-toastify";
import { loginApi } from "../../services/UserSevice";


export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_ERROR = 'FETCH_LOGIN_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';

export const handleLoginRedux = (email,password)=>{
    return async (dispatch) =>{
        dispatch({ type : FETCH_USER_LOGIN });
        let res =await loginApi(email.trim(), password);
    if (res && res.token) {

      localStorage.setItem("token", res.token);
      localStorage.setItem("email",email.trim());

      dispatch({ type : FETCH_LOGIN_SUCCESS,
        data : {
            email : email.trim(),
            token : res.token
        }});

    } else {
      dispatch({ type : FETCH_LOGIN_ERROR });
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    }

}

export const handleLogoutRedux = () =>{
    return(dispatch) =>{
        dispatch({ type : USER_LOGOUT });
    }
    
}