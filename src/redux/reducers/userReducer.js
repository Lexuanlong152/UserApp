import { FETCH_USER_LOGIN,FETCH_LOGIN_SUCCESS,FETCH_LOGIN_ERROR,USER_LOGOUT } from "../actions/UserActions";
const initalState = {
    account : {
        email : '' , 
        auth: false,
        token:''
    }
}

const userReducer =(state=initalState,action)=>{
    switch(action.type){
        case FETCH_USER_LOGIN:
            return {
                ...state
            };
        
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                account:{
                    email :action.data.email,
                    auth: true,
                    token :action.data.token,
                }

            };
        case FETCH_LOGIN_ERROR:
           
            return {
                ...state,
                account:{
                    auth: false,
                }

            };
            case USER_LOGOUT:
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            return {
                ...state,
                account:{
                    auth: false,
                }

            };
        default : return state;

    }
}

export default userReducer;